import type {StudentGuardian} from '../../../domain/entities/StudentGuardian';
import type {IStudentGuardianRepository} from '../../../domain/repositories/IStudentGuardianRepository';

export class GetStudentGuardians {
    private studentGuardianRepository: IStudentGuardianRepository;

    constructor(studentGuardianRepository: IStudentGuardianRepository) {
        this.studentGuardianRepository = studentGuardianRepository;
    }

    async executeByStudent(studentId: number): Promise<StudentGuardian[]> {
        if (studentId <= 0) {
            throw new Error('Invalid student ID');
        }

        return await this.studentGuardianRepository.findByStudent(studentId);
    }

    async executeByGuardian(guardianId: number): Promise<StudentGuardian[]> {
        if (guardianId <= 0) {
            throw new Error('Invalid guardian ID');
        }

        return await this.studentGuardianRepository.findByGuardian(guardianId);
    }
}