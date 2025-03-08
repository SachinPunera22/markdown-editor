import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import { SocketProvider } from '../context/SocketContext';

const AppRoutes: React.FC = () => {
    return (
        <SocketProvider>
            <Router>
                <Routes>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </Router>
        </SocketProvider>
    );
};

export default AppRoutes;