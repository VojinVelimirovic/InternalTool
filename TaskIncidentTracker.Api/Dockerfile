FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["TaskIncidentTracker.Api.csproj", "./"]
RUN dotnet restore "TaskIncidentTracker.Api.csproj"

COPY . .
RUN dotnet build "TaskIncidentTracker.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TaskIncidentTracker.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TaskIncidentTracker.Api.dll"]