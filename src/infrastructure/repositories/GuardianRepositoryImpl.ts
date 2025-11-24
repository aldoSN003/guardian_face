import type {IGuardianRepository} from '../../domain/repositories/IGuardianRepository';
import type {Guardian} from '../../domain/entities/Guardian';
import { apiClient } from '../api/apiClient';

export class GuardianRepositoryImpl implements IGuardianRepository {
    async create(guardian: Guardian): Promise<Guardian> {
        const response = await apiClient.post('/guardians/', guardian);
        return response.data;
    }

    async findAll(): Promise<Guardian[]> {
        const response = await apiClient.get('/guardians/');
        return response.data;
    }

    async update(id: number, guardian: Partial<Guardian>): Promise<Guardian> {
        const response = await apiClient.put(`/guardians/${id}`, guardian);
        return response.data;
    }

    async delete(id: number): Promise<void> {
        await apiClient.delete(`/guardians/${id}`);
    }

    // --- Stubs for methods defined in Interface but not used in the Page yet ---
    // (We use underscores _ to tell TypeScript these variables are intentionally unused)

    async findById(_id: number): Promise<Guardian | null> {
        // Implement when needed: const res = await apiClient.get(`/guardians/${_id}`); return res.data;
        return null;
    }

    async findByEmail(_email: string): Promise<Guardian | null> {
        return null;
    }

    async uploadPhoto(_id: number, _photo: File): Promise<string> {
        return "";
    }

    async uploadFaceEncoding(_id: number, _encoding: File): Promise<string> {
        return "";
    }

    async updatePassword(_id: number, _newPassword: string): Promise<void> {
        // Implement when needed
    }
}