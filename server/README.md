# Markdown Editor Server

## Overview
This is a Node.js server with Socket.IO-based markdown to HTML conversion service. The server provides real-time markdown parsing with robust input validation and error handling.

## Features
- Real-time markdown to HTML conversion
- Socket.io based communication
- TypeScript implementation
- Input validation
- Error handling
- ESLint and Prettier integration

## Prerequisites
- Node.js (v16 or later)
- npm (v8 or later)

## Technology Stack
- Express.js
- Socket.IO
- TypeScript
- Marked (Markdown parsing)
- Zod (Input validation)
- ESLint & Prettier

## Installation

### 1. Clone the Repository
```bash
git clone https://your-repository-url.git
cd markdown-editor-server
```

### 2. Install Dependencies
```bash
npm install
```

## Available Scripts

### Development
```bash
# Start development server with hot reloading
npm run start
```

### Production
```bash
# Build TypeScript to JavaScript
npm run build

# Start production server
npm run start
```

### Linting and Formatting
```bash
# Run ESLint
npm run lint

# Automatically fix linting issues
npm run lint:fix

# Format code
npm run format
```

## Socket Events

### Server Events
- `convert:markdown`: Receive markdown text for conversion
- `convert:html`: Send converted HTML back to client

## License
Distributed under the MIT License. See `LICENSE` for more information.
