import type {StudentGuardian} from '../../../domain/entities/StudentGuardian';
import type {IStudentGuardianRepository} from '../../../domain/repositories/IStudentGuardianRepository';
import type {IStudentRepository} from '../../../domain/repositories/IStudentRepository';
import type {IGuardianRepository} from '../../../domain/repositories/IGuardianRepository';

export class AssignGuardianToStudent {
    private studentGuardianRepository: IStudentGuardianRepository;
    private studentRepository: IStudentRepository;
    private guardianRepository: IGuardianRepository;

    constructor(
        studentGuardianRepository: IStudentGuardianRepository,
        studentRepository: IStudentRepository,
        guardianRepository: IGuardianRepository
    ) {
        this.studentGuardianRepository = studentGuardianRepository;
        this.studentRepository = studentRepository;
        this.guardianRepository = guardianRepository;
    }

    async execute(studentGuardian: StudentGuardian): Promise<StudentGuardian> {
        if (!studentGuardian.studentId || !studentGuardian.guardianId) {
            throw new Error('Student ID and Guardian ID are required');
        }

        if (!studentGuardian.relationship) {
            throw new Error('Relationship is required');
        }

        const student = await this.studentRepository.findById(studentGuardian.studentId);
        if (!student) {
            throw new Error('Student not found');
        }

        const guardian = await this.guardianRepository.findById(studentGuardian.guardianId);
        if (!guardian) {
            throw new Error('Guardian not found');
        }

        const existing = await this.studentGuardianRepository.findByStudentAndGuardian(
            studentGuardian.studentId,
            studentGuardian.guardianId
        );
        if (existing) {
            throw new Error('This guardian is already assigned to this student');
        }

        return await this.studentGuardianRepository.assign(studentGuardian);
    }
}