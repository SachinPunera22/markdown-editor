import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { config } from 'dotenv';
import { MarkdownEditorRouter } from './routers/markdown-editor.router';
import cors from 'cors';

// Load environment variables from .env file
config();

class MarkdownEditorServer {
  private app: express.Application;
  private httpServer: any;
  private io: Server;

  constructor() {
    this.app = express();
    this.app.use(cors());

    this.httpServer = createServer(this.app);
    this.io = new Server(this.httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });
    this.io.on('connect', () => {
      console.log('Happy');
    });

    this.initializeRoutes();
    this.initializeSocketRouters();
  }

  private initializeRoutes() {
    // Health check route
    this.app.get('/health', (req, res) => {
      res.status(200).json({ status: 'Server is running' });
    });
  }

  private initializeSocketRouters() {
    new MarkdownEditorRouter(this.io);
  }

  public start(port: number = parseInt(process.env.PORT || '3000', 10)) {
    // this.io.listen(3000);

    this.httpServer.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}

// Start the server
const server = new MarkdownEditorServer();
server.start();
