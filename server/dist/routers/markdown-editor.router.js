"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownEditorRouter = void 0;
const markdown_editor_controller_1 = require("../controllers/markdown-editor.controller");
class MarkdownEditorRouter {
    constructor(io) {
        this.io = io;
        this.markdownController = new markdown_editor_controller_1.MarkdownEditorController();
        this.initializeSocketEvents();
    }
    initializeSocketEvents() {
        this.io.on('connection', (socket) => {
            console.log('New client connected');
            // Event listener for markdown conversion
            socket.on('convert:markdown', (markdown) => {
                try {
                    const htmlContent = this.markdownController.convertMarkdownToHtml(markdown);
                    // Emit converted HTML back to the client
                    socket.emit('convert:html', {
                        html: htmlContent,
                        success: true,
                    });
                }
                catch (error) {
                    // Handle any errors during conversion
                    socket.emit('convert:html', {
                        error: error instanceof Error ? error.message : 'Conversion failed',
                        success: false,
                    });
                }
            });
            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }
}
exports.MarkdownEditorRouter = MarkdownEditorRouter;
