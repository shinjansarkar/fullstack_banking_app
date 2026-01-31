# Fullstack Banking Application

A full-stack banking application built with React, Node.js, Express, and PostgreSQL.

## Prerequisites

- Node.js (v12 or higher)
- PostgreSQL (v10 or higher)
- Yarn or npm

## Database Setup and Migration

### Quick Start

1. **Install PostgreSQL** and ensure it's running
   ```bash
   # Check PostgreSQL status
   sudo service postgresql status
   ```

2. **Configure database credentials**
   
   Copy the example environment file:
   ```bash
   cd server
   cp .env.example .env
   ```
   
   Edit `server/.env` with your PostgreSQL credentials:
   ```env
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=bank_account
   ```

3. **Create database and run migrations**
   
   **Option A: Using psql (Manual method)**
   ```bash
   # Create database and tables
   psql -U postgres -f server/scripts.sql
   ```
   
   **Option B: Using migration tool (Recommended)**
   ```bash
   # First, create the database manually
   psql -U postgres -c "CREATE DATABASE bank_account;"
   
   # Then run migrations
   cd server
   yarn install
   yarn migrate
   
   # Check migration status
   yarn migrate:status
   ```

### Database Migration

This project includes a migration system to manage database schema changes. See [MIGRATION.md](MIGRATION.md) for detailed migration documentation.

**Available migration commands:**
```bash
cd server
yarn migrate        # Run all pending migrations
yarn migrate:status # Check migration status
```

## Installation and Running

### Backend (Server)

1. Navigate to server directory and install dependencies:
   ```bash
   cd server
   yarn install
   ```

2. Start the backend server:
   ```bash
   yarn start
   ```
   
   The server will run on http://localhost:5000

### Frontend (Client)

1. In a new terminal, navigate to project root and install dependencies:
   ```bash
   cd ..
   yarn install
   ```

2. Start the React development server:
   ```bash
   yarn start
   ```
   
   The app will open at http://localhost:3000

## Project Structure

```
fullstack_banking_app/
├── server/                 # Backend (Node.js + Express)
│   ├── db/                # Database connection
│   ├── middleware/        # Express middleware
│   ├── migrations/        # Database migration files
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── migrate.js         # Migration runner script
│   ├── scripts.sql        # Initial database setup script
│   └── index.js           # Server entry point
├── src/                   # Frontend (React)
│   └── ...
├── public/                # Static files
├── MIGRATION.md           # Detailed migration guide
└── README.md              # This file
```

## API Endpoints

- `POST /signup` - Register new user
- `POST /signin` - Login user
- `POST /logout` - Logout user
- `GET /profile` - Get user profile
- `POST /profile` - Update user profile

## Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bank_account
PORT=5000
JWT_SECRET=your_jwt_secret
```

## Troubleshooting

### Database Connection Issues

1. Verify PostgreSQL is running: `sudo service postgresql status`
2. Check credentials in `server/.env`
3. Ensure database exists: `psql -U postgres -l`

### Migration Issues

See [MIGRATION.md](MIGRATION.md) for detailed troubleshooting steps.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
