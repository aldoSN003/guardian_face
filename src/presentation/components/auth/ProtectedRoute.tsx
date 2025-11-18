// src/presentation/components/auth/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import * as React from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRole: 'admin' | 'guardian';
}

export default function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
    const { isAuthenticated, role, isLoading } = useAuth();

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando...</p>
                </div>
            </div>
        );
    }

    // Redirect to auth if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    // Redirect to correct dashboard if wrong role
    if (role !== allowedRole) {
        const redirectPath = role === 'admin' ? '/admin/dashboard' : '/guardian/dashboard';
        return <Navigate to={redirectPath} replace />;
    }

    return <>{children}</>;
}