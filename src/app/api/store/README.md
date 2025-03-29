# Store API Routes

This directory contains the API route handlers for store-related operations.

## Routes

### User's Store Routes

- **GET /api/modules/store/me**
  - Get the current user's store
  - Requires authentication

- **POST /api/modules/store/me**
  - Create a new store for the current user
  - Requires authentication

- **PUT /api/modules/store/me/update**
  - Update the current user's store details
  - Requires authentication

### Store Routes

- **GET /api/modules/store/[id]**
  - Get public store details by ID
  - No authentication required
  - Returns store details with products

- **GET /api/modules/store/[id]/configuration**
  - Get store configuration details
  - Requires authentication as store owner
  - Returns configuration-related fields

- **GET /api/modules/store/[id]/dashboard**
  - Get dashboard data for a store
  - Requires authentication as store owner
  - Returns analytics and recent products

### Product Routes

- **GET /api/modules/store/[id]/products**
  - Get all products for a store
  - No authentication required

- **POST /api/modules/store/[id]/products**
  - Create a new product for a store
  - Requires authentication as store owner

## Authentication

Authentication is handled via JWT tokens. To authenticate, include a valid token in the `Authorization` header:

```
Authorization: Bearer YOUR_JWT_TOKEN
``` 