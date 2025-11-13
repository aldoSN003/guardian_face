import type {Administrator} from '../entities/Administrator';

export interface IAdministratorRepository {
    findById(id: number): Promise<Administrator | null>;
    findByUsername(username: string): Promise<Administrator | null>;
    updatePassword(id: number, newPassword: string): Promise<void>;
}