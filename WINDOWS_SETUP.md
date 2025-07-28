# 🚀 ClassifiedU - Windows Setup Guide

## Step-by-Step Setup for Windows & VS Code

### Prerequisites

1. **Install Node.js**
   - Go to [nodejs.org](https://nodejs.org/)
   - Download the LTS version (recommended)
   - Run the installer and follow the steps
   - ✅ Check installation: Open Command Prompt and type `node --version`

2. **Install VS Code**
   - Go to [code.visualstudio.com](https://code.visualstudio.com/)
   - Download and install VS Code
   - Open VS Code

### Quick Start (3 Easy Ways)

#### 🔥 Method 1: One-Click Start (Easiest)
1. Double-click the `start-windows.bat` file in your project folder
2. The app will automatically:
   - Install dependencies
   - Start the server
   - Open in your browser

#### 💻 Method 2: VS Code Terminal
1. Open VS Code
2. Open your project folder (File → Open Folder)
3. Open terminal in VS Code (Ctrl + `)
4. Run these commands:
```bash
npm install
npm run dev
```

#### ⚡ Method 3: Command Prompt
1. Open Command Prompt (Win + R, type `cmd`)
2. Navigate to your project folder:
```bash
cd path\to\your\project
npm install
npm run dev
```

### 🌐 Accessing Your App

Once started, your app will be available at:
- **Main App**: http://localhost:5000
- The browser should open automatically
- If not, manually go to the URL above

### 🛠️ VS Code Extensions (Recommended)

Install these for the best experience:

1. **Tailwind CSS IntelliSense** - Auto-complete for CSS classes
2. **ES7+ React/Redux/React-Native snippets** - React code snippets
3. **Prettier - Code formatter** - Auto-format your code
4. **Auto Rename Tag** - Rename HTML/JSX tags automatically
5. **TypeScript Importer** - Auto-import TypeScript modules

**To install:**
- Press `Ctrl + Shift + X` to open Extensions
- Search for each extension name
- Click "Install"

### 📁 Project Structure

```
your-project/
├── 📄 start-windows.bat    ← Double-click to start!
├── 📄 README.md           ← Full documentation
├── 📁 client/             ← React frontend
├── 📁 server/             ← Express backend
├── 📁 shared/             ← Shared code
└── 📄 package.json        ← Dependencies
```

### 🚨 Troubleshooting

**Problem**: "npm is not recognized"
**Solution**: Install Node.js from the official website

**Problem**: "Port 5000 is already in use"
**Solution**: 
- Close other applications using port 5000
- Or change the port in `server/index.ts`

**Problem**: Permission errors
**Solution**: Run VS Code as Administrator (right-click → "Run as administrator")

**Problem**: Slow installation
**Solution**: 
```bash
npm cache clean --force
npm install
```

### 🔧 Available Commands

```bash
# Start development server
npm run dev

# Install all dependencies
npm install

# Build for production
npm run build

# Start production server
npm start

# Clean installation (if problems)
npm run clean
npm install
```

### 💡 Development Tips

1. **Auto-save**: Enable in VS Code (File → Auto Save)
2. **Live reload**: Changes auto-update in browser
3. **Console**: Check browser console (F12) for errors
4. **Terminal**: Keep VS Code terminal open to see logs

### 🎯 What to expect

- **Home page**: Browse categories and featured listings
- **Browse**: Search and filter marketplace items
- **Sell**: Create new listings
- **Roommates**: Find compatible roommates
- **Dark mode**: Toggle in top-right corner

### 📞 Need Help?

1. Check the terminal/console for error messages
2. Make sure Node.js is installed: `node --version`
3. Restart VS Code if things aren't working
4. Delete `node_modules` folder and run `npm install` again

---

🎉 **You're all set!** Your campus marketplace is ready to use.