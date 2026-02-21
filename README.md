# mini-tasks

A full-stack task management application built with Spring Boot and React.  
Designed as a portfolio project to demonstrate backend architecture, JWT-based authentication, and clean API design.

**Clarity over complexity.**

---

## What This Project Demonstrates

- Stateless REST API design with Spring Boot
- JWT authentication and authorization implemented from scratch (no OAuth2 dependency)
- Spring Security filter chain configuration with token-based access control
- PostgreSQL integration with environment-driven configuration
- Dockerized infrastructure with health checks and service orchestration
- CI pipeline using GitHub Actions
- A minimal React frontend consuming a secured backend API without relying on a UI framework

---

## Tech Stack

### Backend

| Layer        | Technology             |
|-------------|------------------------|
| Language    | Java 21 (LTS)          |
| Framework   | Spring Boot            |
| Security    | Spring Security + JWT  |
| Database    | PostgreSQL 16          |
| API Docs    | OpenAPI 3 / Swagger   |
| Build Tool  | Maven                  |

### Frontend

| Layer        | Technology                         |
|-------------|------------------------------------|
| Language    | TypeScript                         |
| Framework   | React                              |
| Build Tool  | Vite                               |
| HTTP Client | Fetch API                          |
| Styling     | Vanilla CSS (no UI framework)      |

### Infrastructure

| Concern     | Tool                    |
|------------|-------------------------|
| Containers | Docker + Docker Compose |
| CI         | GitHub Actions          |
| Config     | Environment variables  |

---

## Features

- User registration and login
- JWT token issuance and validation
- Protected API routes requiring valid tokens
- Task CRUD operations (create, read, update, delete)
- Task completion toggle
- Fully stateless backend (no server-side sessions)
- Interactive API documentation via Swagger UI

---

## Running Locally

### Prerequisites

- Docker
- Docker Compose

### Steps

1. Clone the repository:

```bash
git clone https://github.com/doguhanerbil/mini-tasks.git
cd mini-tasks

Create a .env file in the project root (use .env.example as reference):

POSTGRES_DB=tasksdb
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
APP_JWT_SECRET=your_jwt_secret_here
APP_JWT_EXPIRATION_MINUTES=60

Start all services:

docker compose up -d

Access the application:

Service	URL
Backend	http://localhost:8080

Frontend	http://localhost:5173

Swagger	http://localhost:8080/swagger-ui/index.html

The backend automatically waits for PostgreSQL to pass its health check before starting.
No manual database setup is required.

Authentication Flow
1. Client sends POST /api/auth/register with credentials
2. Server hashes the password and stores the user
3. Client sends POST /api/auth/login
4. Server validates credentials and returns a signed JWT
5. Client sends subsequent requests with Authorization: Bearer <token>
6. Server validates the token on each request via a security filter
7. Invalid or missing tokens result in 401 / 403 responses

Authentication is fully stateless.
Token expiration is configurable via environment variables.

API Documentation

Once the backend is running, the API is documented via Swagger UI:

http://localhost:8080/swagger-ui/index.html

The OpenAPI specification is also available at /v3/api-docs.

Why Minimal UI

The frontend is intentionally minimal.

There is no component library, no CSS framework, and no complex state management.
This is a deliberate architectural decision.

The primary goal of this project is to showcase backend design, security implementation, and API clarity.
The frontend exists solely as a functional client to demonstrate end-to-end behavior: a real user can register, authenticate, and manage tasks through a real interface.

If the goal were to showcase frontend engineering, the technical choices would be different.
Here, the frontend supports the backend — it is not the focus.

Environment Configuration

All sensitive and environment-specific values are managed via a .env file at the project root.
Docker Compose injects these variables into the appropriate services.

Variable	Description	Default
POSTGRES_DB	PostgreSQL database name	tasksdb
POSTGRES_USER	PostgreSQL username	postgres
POSTGRES_PASSWORD	PostgreSQL password	postgres
APP_JWT_SECRET	JWT signing secret	change_me_in_env
APP_JWT_EXPIRATION_MINUTES	Token expiration (minutes)	60

A .env.example file is included as a reference template.

CI

A GitHub Actions workflow runs on every push to main and on pull requests.

The pipeline:

Checks out the code

Sets up Java 21 (Temurin)

Runs backend tests with Maven

Builds the application artifact

Workflow definition: .github/workflows/ci.yml

Author

Doğuhan Erbil

Portfolio: https://doguhanerbil.com

GitHub: https://github.com/doguhanerbil