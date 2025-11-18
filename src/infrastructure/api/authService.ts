// src/infrastructure/api/authService.ts
import apiClient from './apiClient';
import type { Administrator } from '../../domain/entities/Administrator';
import type { Guardian } from '../../domain/entities/Guardian';

// Request types
interface AdminLoginRequest {
    username: string;
    password: string;
}

interface GuardianLoginRequest {
    email: string;
    password: string;
}

interface GuardianRegisterRequest {
    firstName: string;
    lastNamePaternal: string;
    lastNameMaternal?: string;
    age?: number;
    phone?: string;
    email: string;
    password: string;
    address?: string;
}

// Response types
interface AdminLoginResponse {
    message: string;
    administrator: Administrator;
}

interface GuardianLoginResponse {
    message: string;
    guardian: Guardian;
}

export const authService = {
    // Administrator Login
    async loginAdministrator(credentials: AdminLoginRequest): Promise<Administrator> {
        const response = await apiClient.post<AdminLoginResponse>(
            '/administrators/login',
            credentials
        );
        return response.data.administrator;
    },

    // Guardian Login
    async loginGuardian(credentials: GuardianLoginRequest): Promise<Guardian> {
        const response = await apiClient.post<GuardianLoginResponse>(
            '/guardians/login',
            credentials
        );
        return response.data.guardian;
    },

    // Guardian Registration
    async registerGuardian(data: GuardianRegisterRequest): Promise<Guardian> {
        const response = await apiClient.post<Guardian>('/guardians/', data);
        return response.data;
    },

    // Get Administrator by ID (for validation)
    async getAdministrator(id: number): Promise<Administrator> {
        const response = await apiClient.get<Administrator>(`/administrators/${id}`);
        return response.data;
    },

    // Get Guardian by ID (for validation)
    async getGuardian(id: number): Promise<Guardian> {
        const response = await apiClient.get<Guardian>(`/guardians/${id}`);
        return response.data;
    },
};