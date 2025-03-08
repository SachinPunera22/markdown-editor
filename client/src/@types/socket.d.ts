import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

export interface SocketContextType {
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
    isConnected: boolean;
}

export interface MarkdownContextType {
    markdown: string;
    html: string;
    setError: (markdown: string) => void;
    setHtml: (markdown: string) => void;
    error: string | null;
}

export interface SuccessResponse {
    success: true;
    html: string;
    error?: never;
}

export interface ErrorResponse {
    success: false;
    error: string;
    html?: never;
}

export type SocketEventResponse = SuccessResponse | ErrorResponse;