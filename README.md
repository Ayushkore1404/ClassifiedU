# ClassifiedU - Campus Marketplace

A modern campus marketplace application where students can buy, sell, and trade items within their university community.

## Features

- 🎓 **Student Marketplace**: Buy, sell textbooks, electronics, and study materials
- 🏠 **Roommate Finder**: Find compatible roommates within your university
- 🌙 **Dark/Light Mode**: Seamless theme switching
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🚀 **Fast Performance**: Optimized loading with lazy images and caching

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Build Tool**: Vite
- **UI Components**: shadcn/ui + Radix UI

## Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **VS Code** (recommended) - [Download here](https://code.visualstudio.com/)

## Quick Start (Windows)

### 🔥 Super Easy Method (Recommended)

1. **Double-click** the `start-windows.bat` file in your project folder
2. That's it! The app will automatically start and open in your browser

### 💻 VS Code Method

### 1. Clone or Download the Project

If you have Git installed:
```bash
git clone <your-repo-url>
cd classifiedu
```

Or download the project files and extract them to a folder.

### 2. Open in VS Code

1. Open VS Code
2. Click "File" → "Open Folder"
3. Select your project folder
4. VS Code will open the project

### 3. Install Dependencies

Open the VS Code terminal:
- Press `Ctrl + ` (backtick) or go to "Terminal" → "New Terminal"
- Run the following command:

```bash
npm install
```

This will install all required dependencies.

### 4. Set Up Database (Optional for Development)

The app comes with in-memory storage by default. For a full database setup:

1. Install PostgreSQL locally or use a cloud service
2. Create a `.env` file in the root directory:
```env
DATABASE_URL=your_postgresql_connection_string
```

### 5. Start the Application

In the VS Code terminal, run:

```bash
npm run dev
```

This command will:
- Start the backend server on port 5000
- Start the frontend development server
- Automatically open your browser to the application

### 6. Access the Application

The app will be available at:
- **Main Application**: http://localhost:5000
- **API Endpoints**: http://localhost:5000/api/

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run database migrations (if using PostgreSQL)
npm run db:push

# View database in browser (if using PostgreSQL)
npm run db:studio
```

## VS Code Extensions (Recommended)

Install these extensions for the best development experience:

1. **ES7+ React/Redux/React-Native snippets**
2. **Tailwind CSS IntelliSense**
3. **TypeScript Importer**
4. **Prettier - Code formatter**
5. **Auto Rename Tag**

To install extensions:
1. Press `Ctrl + Shift + X`
2. Search for each extension name
3. Click "Install"

## Project Structure

```
classifiedu/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and configurations
│   │   └── contexts/      # React contexts
├── server/                # Express backend
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage layer
│   └── index.ts           # Server entry point
├── shared/                # Shared types and schemas
└── package.json           # Dependencies and scripts
```

## Troubleshooting

### Common Issues on Windows:

1. **"npm not found"**: Install Node.js from the official website
2. **Permission errors**: Run VS Code as administrator
3. **Port already in use**: Close other applications using port 5000
4. **Slow installation**: Try using `npm ci` instead of `npm install`

### If you get errors:

1. Delete `node_modules` folder and `package-lock.json`
2. Run `npm install` again
3. Restart VS Code

## Getting Help

If you need assistance:
1. Check the console in VS Code terminal for error messages
2. Make sure Node.js is properly installed: `node --version`
3. Ensure all dependencies installed: `npm list`

## Building for Production

When ready to deploy:

```bash
npm run build
npm start
```

This creates an optimized production build and starts the server.