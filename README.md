# Tasker - Frontend 🚀

A minimalist, modern workspace for managing your daily flow. Built with React, TypeScript, and Vite, featuring a premium UI and secure authentication.

## ✨ Features

- **Secure Authentication**: Integration with Auth0 for a safe and seamless login experience.
- **Task Management**: Full CRUD operations for tasks (Create, Read, Update, Delete).
- **Workflow Flow**: Move tasks through a defined lifecycle: `PENDING` → `IN_PROGRESS` → `DONE` → `ARCHIVED`.
- **Intelligent Validations**: Business rules enforced both in UI and API (e.g., only title edits allowed for completed tasks).
- **Responsive Design**: Premium look and feel using Material UI, optimized for all screen sizes.
- **Real-time Feedback**: Instant notifications via snackbars for all user actions.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [Material UI (MUI)](https://mui.com/)
- **Authentication**: [@auth0/auth0-react](https://auth0.com/)
- **API Client**: [Axios](https://axios-http.com/)
- **Testing**: [Cypress](https://www.cypress.io/)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root of the frontend directory with the following configuration:

```env
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_AUDIENCE=https://task-api
VITE_API_URL=http://localhost:3000/api
```

### Running the Application

Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## 🧪 Testing

The project uses Cypress for End-to-End testing.

### Run Tests (Headless)
```bash
npm run cypress:run
```

### Open Cypress Dashboard
```bash
npm run cypress:open
```

## 🏗️ Architecture

- **`/src/components`**: Reusable UI components (TaskCard, TaskMenu, etc.).
- **`/src/hooks`**: Custom React hooks for business logic (useTasks).
- **`/src/services`**: API service layer using Axios.
- **`/src/auth`**: Authentication providers and protected routes.
- **`/src/pages`**: Main application views (LoginPage, DashboardPage).

