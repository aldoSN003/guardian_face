import type {Guardian} from '../../../domain/entities/Guardian';
import type {IGuardianRepository} from '../../../domain/repositories/IGuardianRepository';

export class UpdateGuardian {
    private guardianRepository: IGuardianRepository;

    constructor(guardianRepository: IGuardianRepository) {
        this.guardianRepository = guardianRepository;
    }

    async execute(id: number, guardian: Partial<Guardian>): Promise<Guardian> {
        if (id <= 0) {
            throw new Error('Invalid guardian ID');
        }

        const existing = await this.guardianRepository.findById(id);
        if (!existing) {
            throw new Error('Guardian not found');
        }

        if (guardian.email && !this.isValidEmail(guardian.email)) {
            throw new Error('Invalid email format');
        }

        return await this.guardianRepository.update(id, guardian);
    }

    private isValidEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}