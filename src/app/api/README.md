# API Structure

This API follows Next.js API routes recommendations with a domain-driven design approach.

## Directory Structure

```
/app/api/
├── auth/                 # Authentication routes
│   ├── login/            # Login endpoint
│   ├── register/         # Registration endpoint
│   └── reset-password/   # Password reset endpoints
├── users/                # User management routes
├── stores/               # Store management routes
│   └── [storeId]/        # Store-specific operations
│       ├── products/     # Product routes for a specific store
│       └── settings/     # Store settings routes
├── base-products/        # Base product management routes
├── modules/              # Domain modules (business logic)
│   ├── users/            # User domain
│   │   ├── controllers/  # Route handlers
│   │   ├── services/     # Business logic
│   │   ├── repositories/ # Data access
│   │   └── entities/     # Data models
│   ├── store/            # Store domain
│   │   ├── controllers/  # Route handlers
│   │   ├── services/     # Business logic
│   │   ├── repositories/ # Data access
│   │   └── entities/     # Data models
│   └── storage/          # Storage services
│       └── services/     # Storage implementations
└── middleware/           # API middleware (auth, etc.)
```

## API Routes and Module Controllers

Each API route imports and uses the corresponding controller from the modules directory. This allows for:

1. Clean route handlers focused on HTTP concerns
2. Reusable business logic in services
3. Domain-specific code organization

## Storage Service

The API uses the `IImageStorage` interface with implementations like `FirebaseImageStorage` for handling image uploads. This allows for:

- Swapping storage providers without changing business logic
- Handling file uploads consistently across the application
- Testing with mock implementations

## Authentication and Authorization

- JWT-based authentication
- Route handlers validate user sessions before processing requests
- Protected routes ensure users can only access their own data

## Data Models

- `User`: Account details and authentication information
- `Store`: Company store details and settings
- `BaseProduct`: Template products (types, sizes, base prices)
- `StoreProduct`: Store-specific customized products

## Request Handling

- JSON requests for most operations
- FormData for file uploads and multipart requests
- Proper error handling and status codes

## Development

Make sure to follow the modular approach when adding new features:

1. Define entities and repositories first
2. Implement services with business logic
3. Create controllers to handle HTTP specifics
4. Connect API routes to controllers 