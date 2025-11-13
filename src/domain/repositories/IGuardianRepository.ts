import type {Guardian} from '../entities/Guardian';

export interface IGuardianRepository {
    create(guardian: Guardian): Promise<Guardian>;
    findById(id: number): Promise<Guardian | null>;
    findByEmail(email: string): Promise<Guardian | null>;
    findAll(): Promise<Guardian[]>;
    update(id: number, guardian: Partial<Guardian>): Promise<Guardian>;
    delete(id: number): Promise<void>;
    uploadPhoto(id: number, photo: File): Promise<string>;
    uploadFaceEncoding(id: number, encoding: File): Promise<string>;
    updatePassword(id: number, newPassword: string): Promise<void>;
}