import type {Guardian, CreateGuardianDto} from '../../../domain/entities/Guardian';
import type {IGuardianRepository} from '../../../domain/repositories/IGuardianRepository';

export class CreateGuardian {
    private guardianRepository: IGuardianRepository;

    constructor(guardianRepository: IGuardianRepository) {
        this.guardianRepository = guardianRepository;
    }

    async execute(guardian: CreateGuardianDto): Promise<Guardian> {
        if (!guardian.firstName || !guardian.lastNamePaternal) {
            throw new Error('First name and paternal last name are required');
        }

        if (guardian.email && !this.isValidEmail(guardian.email)) {
            throw new Error('Invalid email format');
        }

        return await this.guardianRepository.create(guardian);
    }

    private isValidEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}