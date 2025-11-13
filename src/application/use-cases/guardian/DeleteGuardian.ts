import type {IGuardianRepository} from '../../../domain/repositories/IGuardianRepository';

export class DeleteGuardian {
    private guardianRepository: IGuardianRepository;

    constructor(guardianRepository: IGuardianRepository) {
        this.guardianRepository = guardianRepository;
    }

    async execute(id: number): Promise<void> {
        if (id <= 0) {
            throw new Error('Invalid guardian ID');
        }

        const existing = await this.guardianRepository.findById(id);
        if (!existing) {
            throw new Error('Guardian not found');
        }

        await this.guardianRepository.delete(id);
    }
}