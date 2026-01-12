# InternalTool

An internal web application for teams to track tasks, incidents, and status changes with role-based access control and audit logging.

# Docker Setup

## Prerequisites

- Docker Desktop installed
- .NET 8.0 SDK (for local development)

## First Time Setup

1. **Copy the example files and configure secrets:**

   ```bash
   cp appsettings.example.json appsettings.json
   cp docker-compose.example.yml docker-compose.yml
   ```

2. **Edit `appsettings.json` and change:**

   - `Jwt:Secret` to a strong random secret (at least 32 characters)

3. **Edit `docker-compose.yml` and change:**
   - `SA_PASSWORD` to a strong password (must contain uppercase, lowercase, numbers, and symbols)
   - `Jwt__Secret` to match the one in appsettings.json

## Running the Application

```bash
# Build and start containers
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Stop and remove all data (including database)
docker-compose down -v
```

## Accessing the Application

- API: http://localhost:5000
- Swagger: http://localhost:5000/swagger
- SQL Server: localhost:1433
  - Username: sa
  - Password: (the one you set in docker-compose.yml)

## Troubleshooting

If the API fails to connect to SQL Server on first startup:

- Wait 30 seconds for SQL Server to fully initialize
- The API will automatically retry and connect

If you see "container is unhealthy":

- Run `docker-compose down -v`
- Run `docker-compose up -d --build`

## Security Notes

**NEVER commit the following files to Git:**

- `appsettings.json` (contains secrets)
- `appsettings.Production.json` (contains secrets)
- `docker-compose.yml` (contains passwords)
- `.env` files

These files are in `.gitignore` to protect your secrets.
