# Task Management Application

A modern web application for managing tasks and to-do items with user authentication.

## Features

### User Management
- User registration with email verification
- Secure login system
- Profile management
- Role-based access (admin and regular users)

### Task Management
- Create, view, edit, and delete tasks
- Task properties include:
  - Title and description
  - Priority levels (High, Medium, Low)
  - Due dates
  - Categories
  - Status tracking (Pending, In Progress, Completed)
- Filter tasks by priority, category, and status
- Dashboard with task statistics

## Technology Stack

- **Frontend**:
  - React with Vite for fast development
  - Tailwind CSS for modern UI design
  - React Router for navigation
  - React Hook Form for form handling

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm dev
   ```

3. Open http://localhost:3000 in your browser

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Main application pages
│   ├── Dashboard
│   ├── Login
│   ├── Register
│   ├── TaskList
│   ├── TaskDetails
│   └── Profile
└── context/       # React context for state management
```

## Current Status
- Frontend implementation completed
- Ready for backend integration

## Author
Essam (210041169)