import type {Guardian} from '../../../domain/entities/Guardian';
import type {IGuardianRepository} from '../../../domain/repositories/IGuardianRepository';

export class GetGuardian {
    private guardianRepository: IGuardianRepository;

    constructor(guardianRepository: IGuardianRepository) {
        this.guardianRepository = guardianRepository;
    }

    async execute(id: number): Promise<Guardian | null> {
        if (id <= 0) {
            throw new Error('Invalid guardian ID');
        }

        return await this.guardianRepository.findById(id);
    }

    async executeAll(): Promise<Guardian[]> {
        return await this.guardianRepository.findAll();
    }
}