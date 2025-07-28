@echo off
echo Starting ClassifiedU Campus Marketplace...
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

:: Check if dependencies are installed
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo Error: Failed to install dependencies
        pause
        exit /b 1
    )
)

:: Start the application
echo Starting the application...
echo.
echo The app will open in your browser automatically.
echo If it doesn't, go to: http://localhost:5000
echo.
echo Press Ctrl+C to stop the server when done.
echo.

cross-env NODE_ENV=development tsx server/index.ts

pause