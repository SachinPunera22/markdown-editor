import { Server } from 'socket.io';
import { MarkdownEditorController } from '../controllers/markdown-editor.controller';

export class MarkdownEditorRouter {
  private io: Server;
  private markdownController: MarkdownEditorController;

  constructor(io: Server) {
    this.io = io;
    this.markdownController = new MarkdownEditorController();
    this.initializeSocketEvents();
  }

  private initializeSocketEvents() {
    this.io.on('connect', (socket) => {
      // Event listener for markdown conversion
      socket.on('convert:markdown', (markdown: string) => {
        try {
          const htmlContent = this.markdownController.convertMarkdownToHtml(markdown);

          // Emit converted HTML back to the client
          socket.emit('convert:html', {
            html: htmlContent,
            success: true,
          });
        } catch (error) {
          // Handle any errors during conversion
          socket.emit('convert:html', {
            error: error?.message || 'Conversion failed',
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
