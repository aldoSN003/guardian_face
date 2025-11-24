import type {IStudentRepository} from '../../domain/repositories/IStudentRepository';
import type {Student} from '../../domain/entities/Student';
import { apiClient } from '../api/apiClient';

export class StudentRepositoryImpl implements IStudentRepository {
    async create(student: Student): Promise<Student> {
        const response = await apiClient.post('/students/', student);
        return response.data;
    }

    async findAll(): Promise<Student[]> {
        const response = await apiClient.get('/students/');
        return response.data;
    }

    async findById(id: number): Promise<Student | null> {
        try {
            const response = await apiClient.get(`/students/${id}`);
            return response.data;
        } catch (error) {
            return null;
        }
    }

    async findByEnrollmentNumber(enrollmentNumber: string): Promise<Student | null> {
        try {
            const response = await apiClient.get(`/students/enrollment/${enrollmentNumber}`);
            return response.data;
        } catch (error) {
            // Assuming 404 means not found, return null rather than throw
            return null;
        }
    }

    async update(id: number, student: Partial<Student>): Promise<Student> {
        const response = await apiClient.put(`/students/${id}`, student);
        return response.data;
    }

    async delete(id: number): Promise<void> {
        await apiClient.delete(`/students/${id}`);
    }

    async uploadPhoto(id: number, photo: File): Promise<string> {
        const formData = new FormData();
        formData.append('file', photo);
        const response = await apiClient.post(`/students/${id}/photo`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data.url;
    }
}