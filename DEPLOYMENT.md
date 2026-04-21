# Capstone Project - Automated Deployment

This project is configured to run entirely via Docker Compose. Follow the instructions below to start the application.

## Prerequisites
- Docker
- Docker Compose

## How to Run

1.  **Build and Start**: Run the following command in the root directory:
    ```bash
    docker compose up --build
    ```
    *Note: If `docker compose` is not available, try `docker-compose up --build`. On some Linux systems, `docker compose` (V2) is more stable.*

2.  **Access the Application**:
    -   **Frontend**: [http://localhost](http://localhost)
    -   **Backend (API)**: [http://localhost:8081](http://localhost:8081)
    -   **Database**: Port `5433` (external) / `5432` (internal)

## Services Included
- **db**: PostgreSQL 15 database.
- **backend**: Spring Boot application.
- **frontend**: React application (served via Nginx).

## Troubleshooting
If you encounter errors related to the database connection on the first run, restart the backend service:
```bash
docker-compose restart backend
```
