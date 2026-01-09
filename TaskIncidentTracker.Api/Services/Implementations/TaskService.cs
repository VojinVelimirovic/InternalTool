using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TaskIncidentTracker.Api.Data;
using TaskIncidentTracker.Api.DTOs.Tasks;
using TaskIncidentTracker.Api.Models;
using TaskIncidentTracker.Api.Services.Interfaces;

namespace TaskIncidentTracker.Api.Services.Implementations
{
    public class TaskService : ITaskService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<TaskService> _logger;

        public TaskService(ApplicationDbContext context, ILogger<TaskService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<TaskItem?> AssignTask(string managerId, TaskAssignmentRequest req)
        {
            var task = await _context.Tasks
                .Include(t => t.AssignedTo)
                .FirstOrDefaultAsync(t => t.Id == req.TaskId);
            if (task == null)
            {
                return null;
            }
            var logMsg = "["+DateTime.UtcNow+"] User " + managerId+" has assigned the task " + task.Id + " to users with the following Ids: ";
            foreach (int userId in req.UserIds)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
                if (user == null)
                {
                    continue;
                }
                if (!task.AssignedTo.Any(u => u.Id == userId))
                {
                    task.AssignedTo.Add(user);
                    logMsg += userId + ", ";
                }
            }
            task.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            _logger.LogInformation(logMsg.Substring(0, logMsg.Length - 2));
            return task;
        }

        public async Task<TaskItem?> ChangeTaskStatus(string managerId, TaskStatusChangeRequest req)
        {
            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == req.TaskId);
            if (task == null)
            {
                return null;
            }
            task.Status = req.Status;
            task.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            _logger.LogInformation($"[{DateTime.UtcNow}] User {managerId} has changed task {task.Id}'s status to {task.Status.ToString()}");
            return task;
        }

        public async Task<TaskItem> CreateTask(string creatorId, TaskCreationRequest taskRequest)
        {
            var task = new TaskItem
            {
                Title = taskRequest.Title,
                Description = taskRequest.Description,
                Status = Models.TaskStatus.OPEN,
                Priority = taskRequest.Priority,
                CreatedById = Int32.Parse(creatorId),
                CreatedAt = DateTime.UtcNow
            };
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            _logger.LogInformation($"[{DateTime.UtcNow}] User {creatorId} has created task {task.Id} - {task.Title}");
            return task;
        }
    }
}
