// src/presentation/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Administrator } from '../../domain/entities/Administrator';
import type { Guardian } from '../../domain/entities/Guardian';

type UserRole = 'admin' | 'guardian' | null;

interface AuthState {
    user: Administrator | Guardian | null;
    role: UserRole;
    isAuthenticated: boolean;
    isLoading: boolean;
}

interface AuthContextType extends AuthState {
    loginAsAdmin: (admin: Administrator) => void;
    loginAsGuardian: (guardian: Guardian) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'guardianface_auth';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        role: null,
        isAuthenticated: false,
        isLoading: true,
    });

    // Load auth state from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(AUTH_STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setAuthState({
                    ...parsed,
                    isLoading: false,
                });
            } else {
                setAuthState(prev => ({ ...prev, isLoading: false }));
            }
        } catch (error) {
            console.error('Failed to load auth state:', error);
            setAuthState(prev => ({ ...prev, isLoading: false }));
        }
    }, []);

    // Save auth state to localStorage whenever it changes
    useEffect(() => {
        if (!authState.isLoading) {
            if (authState.isAuthenticated) {
                const toStore = {
                    user: authState.user,
                    role: authState.role,
                    isAuthenticated: authState.isAuthenticated,
                };
                localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(toStore));
            } else {
                localStorage.removeItem(AUTH_STORAGE_KEY);
            }
        }
    }, [authState]);

    const loginAsAdmin = (admin: Administrator) => {
        setAuthState({
            user: admin,
            role: 'admin',
            isAuthenticated: true,
            isLoading: false,
        });
    };

    const loginAsGuardian = (guardian: Guardian) => {
        setAuthState({
            user: guardian,
            role: 'guardian',
            isAuthenticated: true,
            isLoading: false,
        });
    };

    const logout = () => {
        setAuthState({
            user: null,
            role: null,
            isAuthenticated: false,
            isLoading: false,
        });
        localStorage.removeItem(AUTH_STORAGE_KEY);
    };

    return (
        <AuthContext.Provider
            value={{
                ...authState,
                loginAsAdmin,
                loginAsGuardian,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}