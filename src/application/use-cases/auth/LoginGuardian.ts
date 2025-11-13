import type {Guardian} from '../../../domain/entities/Guardian';
import type {IGuardianRepository} from '../../../domain/repositories/IGuardianRepository';

export class LoginGuardian {
    private guardianRepository: IGuardianRepository;

    constructor(guardianRepository: IGuardianRepository) {
        this.guardianRepository = guardianRepository;
    }

    async execute(email: string, password: string): Promise<Guardian> {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        if (!this.isValidEmail(email)) {
            throw new Error('Invalid email format');
        }

        const guardian = await this.guardianRepository.findByEmail(email);

        if (!guardian) {
            throw new Error('Invalid email or password');
        }

        // Password validation will be done by backend

        return guardian;
    }

    private isValidEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}