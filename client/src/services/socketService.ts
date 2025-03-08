import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import {
    getSocketConfig,
    handleSocketError,
    socketConnectionTracker
} from '../utils/socketConfig';
import { SocketEventResponse } from '../@types/socket';

export class SocketService {
    private static instance: SocketService;
    private socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

    private constructor() {}

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    connect(): Socket<DefaultEventsMap, DefaultEventsMap> {
        // If socket already exists, return it
        if (this.socket) {
            return this.socket;
        }

        const { url, options } = getSocketConfig();

        try {
            // Explicitly type the socket
            const newSocket = io(url, options);

            newSocket.on('connect', () => {
                socketConnectionTracker.markConnected();
                console.log('Socket connected');
            });

            newSocket.on('disconnect', (reason) => {
                socketConnectionTracker.markDisconnected();
                console.log('Socket disconnected:', reason);

                // Attempt reconnection if allowed
                if (socketConnectionTracker.shouldAttemptReconnect()) {
                    this.reconnect();
                }
            });

            newSocket.on('connect_error', (error) => {
                handleSocketError(error);
            });

            // Store the socket
            this.socket = newSocket;

            return this.socket;
        } catch (error) {
            handleSocketError(error as Error);
            throw error;
        }
    }

    private reconnect(): void {
        if (this.socket) {
            this.socket.connect();
        }
    }

    disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            socketConnectionTracker.reset();
        }
    }

    convertMarkdown(markdown: string, callback: (response: SocketEventResponse) => void): void {
        // Ensure socket exists before emitting
        const socket = this.socket || this.connect();

        socket.emit('convert:markdown', markdown);
        socket.on('convert:html', callback);
    }
}

export default SocketService.getInstance();