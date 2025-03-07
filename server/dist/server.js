"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const markdown_editor_router_1 = require("./routers/markdown-editor.router");
class MarkdownEditorServer {
    constructor() {
        this.app = (0, express_1.default)();
        this.httpServer = (0, http_1.createServer)(this.app);
        this.io = new socket_io_1.Server(this.httpServer, {
            cors: {
                origin: '*', // Adjust this in production
                methods: ['GET', 'POST'],
            },
        });
        this.initializeRoutes();
        this.initializeSocketRouters();
    }
    initializeRoutes() {
        // Health check route
        this.app.get('/health', (req, res) => {
            res.status(200).json({ status: 'Server is running' });
        });
    }
    initializeSocketRouters() {
        new markdown_editor_router_1.MarkdownEditorRouter(this.io);
    }
    start(port = 3000) {
        this.httpServer.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}
// Start the server
const server = new MarkdownEditorServer();
server.start();
