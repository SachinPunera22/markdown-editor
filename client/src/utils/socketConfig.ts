import { ManagerOptions, SocketOptions } from 'socket.io-client';

// Interface for socket configuration
export interface SocketConfig {
    url: string;
    options: Partial<ManagerOptions & SocketOptions> & {
        reconnection: boolean;
        reconnectionAttempts: number;
        reconnectionDelay: number;
        timeout: number;
        transports: string[];
    };
}

// Get socket configuration from environment variables
export const getSocketConfig = (): SocketConfig => {
    const env = process.env.REACT_APP_ENV || 'development';

    return {
        url: process.env.REACT_APP_SOCKET_URL || 'http://localhost:3000',
        options: {
            reconnection: process.env.REACT_APP_SOCKET_RECONNECTION === 'true',
            reconnectionAttempts: parseInt(process.env.REACT_APP_SOCKET_RECONNECTION_ATTEMPTS || '5', 10),
            reconnectionDelay: parseInt(process.env.REACT_APP_SOCKET_RECONNECTION_DELAY || '1000', 10),
            timeout: parseInt(process.env.REACT_APP_SOCKET_TIMEOUT || '10000', 10),
            transports: env === 'production'
                ? ['websocket', 'polling']
                : ['websocket']
        }
    };
};

// Error handling utility for socket connections
export const handleSocketError = (error: Error): void => {
    console.error('Socket Connection Error:', error);

    // Log to error tracking service
    // You can integrate with services like Sentry here
    if (process.env.REACT_APP_ERROR_TRACKING_ENABLED === 'true') {
        // Example: Sentry.captureException(error);
    }
};

// Connection status tracking
export class SocketConnectionTracker {
    private static instance: SocketConnectionTracker;

    private _isConnected = false;
    private _connectionAttempts = 0;
    private _lastConnectionAttempt: Date | null = null;

    private constructor() {}

    public static getInstance(): SocketConnectionTracker {
        if (!SocketConnectionTracker.instance) {
            SocketConnectionTracker.instance = new SocketConnectionTracker();
        }
        return SocketConnectionTracker.instance;
    }

    get isConnected(): boolean {
        return this._isConnected;
    }

    get connectionAttempts(): number {
        return this._connectionAttempts;
    }

    get lastConnectionAttempt(): Date | null {
        return this._lastConnectionAttempt;
    }

    markConnected(): void {
        this._isConnected = true;
        this._connectionAttempts = 0;
        this._lastConnectionAttempt = new Date();
    }

    markDisconnected(): void {
        this._isConnected = false;
        this._connectionAttempts++;
        this._lastConnectionAttempt = new Date();
    }

    shouldAttemptReconnect(maxAttempts: number = 5): boolean {
        return this._connectionAttempts < maxAttempts;
    }

    reset(): void {
        this._isConnected = false;
        this._connectionAttempts = 0;
        this._lastConnectionAttempt = null;
    }
}

// Export a singleton instance
export const socketConnectionTracker = SocketConnectionTracker.getInstance();