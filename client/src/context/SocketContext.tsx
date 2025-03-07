import React, { createContext, useState, useEffect, useMemo } from 'react';
import { Socket } from 'socket.io-client';
import SocketService from '../services/socketService';
import { SocketContextType } from '../@types/socket';

export const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false
});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socketInstance = SocketService.connect();

        socketInstance.on('connect', () => {
            setSocket(socketInstance);
            setIsConnected(true);
        });

        socketInstance.on('disconnect', () => {
            setIsConnected(false);
        });

        return () => {
            SocketService.disconnect();
        };
    }, []);

    const contextValue = useMemo(() => ({ socket, isConnected }), [socket, isConnected]);

    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    );
};