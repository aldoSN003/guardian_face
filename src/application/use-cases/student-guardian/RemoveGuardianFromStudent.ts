import type {IStudentGuardianRepository} from '../../../domain/repositories/IStudentGuardianRepository';

export class RemoveGuardianFromStudent {
    private studentGuardianRepository: IStudentGuardianRepository;

    constructor(studentGuardianRepository: IStudentGuardianRepository) {
        this.studentGuardianRepository = studentGuardianRepository;
    }

    async execute(studentId: number, guardianId: number): Promise<void> {
        if (!studentId || !guardianId) {
            throw new Error('Student ID and Guardian ID are required');
        }

        const existing = await this.studentGuardianRepository.findByStudentAndGuardian(
            studentId,
            guardianId
        );
        if (!existing) {
            throw new Error('Relationship not found');
        }

        await this.studentGuardianRepository.remove(studentId, guardianId);
    }
}