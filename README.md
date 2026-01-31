## Connect to Postgresql Database

Add Postgresql database connection details in `server/db/connect.js` file

## Add database tables

Execute sql scripts from `server/scripts.sql` file manually using one of the following methods:

### Method 1: Using psql Command Line (Recommended)

1. Open your terminal/command prompt
2. Navigate to the project directory:
   ```bash
   cd /path/to/fullstack_banking_app
   ```
3. Execute the SQL script using psql:
   ```bash
   psql -U postgres -f server/scripts.sql
   ```
   - Replace `postgres` with your PostgreSQL username if different
   - You'll be prompted for your PostgreSQL password

### Method 2: Using psql Interactive Mode

1. Connect to PostgreSQL:
   ```bash
   psql -U postgres
   ```
2. Run the script from within psql:
   ```sql
   \i server/scripts.sql
   ```
   Or using absolute path:
   ```sql
   \i /full/path/to/server/scripts.sql
   ```

### Method 3: Using pgAdmin (GUI Tool)

1. Open pgAdmin and connect to your PostgreSQL server
2. Right-click on "Databases" and select "Create" → "Database"
3. Name it `bank_account` (or skip this if using the script to create it)
4. Open the Query Tool (Tools → Query Tool or right-click on the database)
5. Open the file `server/scripts.sql` or copy-paste its contents
6. Click the "Execute" button (▶️) or press F5

### Method 4: Copy-Paste Method

1. Open `server/scripts.sql` in a text editor
2. Copy all the SQL commands
3. Connect to PostgreSQL using any client (psql, pgAdmin, DBeaver, etc.)
4. Paste and execute the commands

### Prerequisites

- PostgreSQL must be installed and running
- You need a PostgreSQL user with sufficient privileges to create databases and tables
- Make sure PostgreSQL service is running:
  - **Windows**: Check Services for "postgresql-x64-XX"
  - **Linux/Mac**: `sudo service postgresql status` or `brew services list`

### Troubleshooting

- **Permission denied**: Ensure your PostgreSQL user has CREATE DATABASE privileges
- **Database already exists**: Drop the existing database first with `DROP DATABASE bank_account;` or use a different database name
- **psql command not found**: Add PostgreSQL bin directory to your system PATH
- **Connection refused**: Verify PostgreSQL is running and accepting connections on port 5432

## To run the project execute following commands in sequence

    1. cd server
    2. yarn install
    3. yarn start
    4. cd ..
    5. yarn install
    6. yarn start


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

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
