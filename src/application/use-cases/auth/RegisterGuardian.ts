import type {Guardian, CreateGuardianDto} from '../../../domain/entities/Guardian';
import type {IGuardianRepository} from '../../../domain/repositories/IGuardianRepository';

export class RegisterGuardian {
    private guardianRepository: IGuardianRepository;

    constructor(guardianRepository: IGuardianRepository) {
        this.guardianRepository = guardianRepository;
    }

    async execute(guardianData: CreateGuardianDto & { password: string }): Promise<Guardian> {
        if (!guardianData.firstName || !guardianData.lastNamePaternal) {
            throw new Error('First name and paternal last name are required');
        }

        if (!guardianData.email) {
            throw new Error('Email is required');
        }

        if (!this.isValidEmail(guardianData.email)) {
            throw new Error('Invalid email format');
        }

        if (!guardianData.password || guardianData.password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }

        // Check if guardian already exists
        const existing = await this.guardianRepository.findByEmail(guardianData.email);
        if (existing) {
            throw new Error('Guardian with this email already exists');
        }

        return await this.guardianRepository.create(guardianData);
    }

    private isValidEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}