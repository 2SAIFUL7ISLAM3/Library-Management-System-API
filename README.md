# Library Management System API

## Project Name & Description
The **Library Management System API** is a backend service designed to manage library resources, memberships, and borrowing activities. This API enables library staff and members to perform essential operations like adding books, managing member data, borrowing, and returning books, while tracking overdue items. The purpose of this project is to streamline library operations, making book and member management efficient and organized.

## Live URL
- [Live API Deployment](https://your-live-api-url.com) *(Replace with actual URL when available)*

## Technology Stack & Packages
This project was developed using the following technologies and packages:

- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web framework for building the RESTful API.
- **Prisma ORM**: Database ORM used for schema management and type-safe database access.
- **PostgreSQL**: Relational database for storing all library data.
- **TypeScript**: Superset of JavaScript used for enhanced code reliability and readability.

Additional Packages:
- **UUID**: For generating unique identifiers for records.
- **Dotenv**: To load environment variables from a `.env` file.
- **Cors**: To enable cross-origin requests.
- **Express-Async-Handler**: Simplifies error handling in asynchronous routes.

## Setup Instructions
Follow these steps to install and run the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/library-management-api.git
   cd library-management-api
   ```

## Install Dependencies:

```bash

npm install
```
## Environment Variables:

Create a .env file in the project root and configure the following environment variables:
```
DATABASE_URL="your-database-connection-url"
PORT=3000
```
## Migrate Database Schema:

Run Prisma migrations to create the necessary tables in PostgreSQL.

```bash
npx prisma migrate dev
```
## Start the Server:

```bash
npm run dev
The API should now be running on  http://localhost:3000.
```
## Access API Documentation:

 Configure Swagger or another documentation tool for testing endpoints directly.

## Key Features & Functionality

-**Book Management**: Add, update, retrieve, and delete books in the library.
-**Member Management**: Manage library member information with CRUD operations.
-**Borrowing & Returning Books**: Track borrowing and returning activities, with validation for available copies.
-**Overdue Tracking**: List overdue borrow records for books not returned within 14 days.
-**Error Handling**: Standardized error messages and HTTP status codes for easy troubleshooting.



