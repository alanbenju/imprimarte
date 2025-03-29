# Imprimarte

A platform for creating and managing custom clothing stores.

## Tech Stack

- **Frontend**: Next.js 13+ with App Router
- **Backend**: Next.js API Routes with MikroORM
- **Database**: PostgreSQL (via Docker)
- **Authentication**: JWT-based
- **UI**: Shadcn UI + Tailwind CSS

## Prerequisites

- Node.js 20.x
- Docker and Docker Compose
- npm or yarn

## Project Structure

```
imprimarte/
├── src/
│   └── app/
│       ├── api/              # Backend API
│       │   ├── entities/     # Database entities
│       │   ├── repositories/ # Data access layer
│       │   ├── services/     # Business logic
│       │   └── middleware/   # Request processing
│       └── ...              # Frontend components and pages
├── public/                  # Static assets
└── docker-compose.yml      # Docker services configuration
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/imprimarte.git
cd imprimarte
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the database:
```bash
npm run docker:up
```

5. Start the development server:
```bash
npm run dev
```

## Database Management

### Docker Commands

- Start database services:
  ```bash
  npm run docker:up
  ```

- Stop database services:
  ```bash
  npm run docker:down
  ```

- View logs:
  ```bash
  npm run docker:logs
  ```

- Reset database (WARNING: Deletes all data):
  ```bash
  npm run db:fresh
  ```

### Database GUI (pgAdmin)

1. Access pgAdmin at http://localhost:5050
2. Login with:
   - Email: admin@admin.com
   - Password: admin
3. Add a new server:
   - Host: postgres
   - Port: 5432
   - Database: customia
   - Username: postgres
   - Password: postgres

### Migrations

- Create a new migration:
  ```bash
  npm run migration:create
  ```

- Apply migrations:
  ```bash
  npm run migration:up
  ```

- Revert migrations:
  ```bash
  npm run migration:down
  ```

- Reset database schema:
  ```bash
  npm run schema:fresh
  ```

## Development

### Code Organization

- **Entities** (`src/app/api/entities/`): Database models using MikroORM decorators
- **Repositories** (`src/app/api/repositories/`): Data access layer
- **Services** (`src/app/api/services/`): Business logic
- **API Routes** (`src/app/api/`): Next.js API endpoints
- **Frontend** (`src/app/`): Next.js pages and components

### Best Practices

1. **Database**:
   - Always use migrations for schema changes
   - Never modify existing migrations
   - Use repositories for database access
   - Keep entities focused and cohesive

2. **API**:
   - Follow REST principles
   - Use proper HTTP methods and status codes
   - Validate input with Zod schemas
   - Handle errors consistently

3. **Authentication**:
   - Use JWT for stateless authentication
   - Store tokens securely
   - Implement proper token refresh
   - Follow security best practices

4. **Frontend**:
   - Use Server Components when possible
   - Implement proper loading states
   - Handle errors gracefully
   - Follow accessibility guidelines

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier
- `npm run fix-styles`: Run linting and formatting

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
