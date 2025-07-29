@echo off
echo Starting ClassifiedU...
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

:: Install dependencies if needed
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

:: Start the application using npm script
echo Starting the application...
echo Go to: http://localhost:5000
echo Press Ctrl+C to stop the server
echo.

npm run dev

pause