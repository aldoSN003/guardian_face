import type {IStudentGuardianRepository} from '../../../domain/repositories/IStudentGuardianRepository';
import type {IGuardianRepository} from '../../../domain/repositories/IGuardianRepository';
import type {IStudentRepository} from '../../../domain/repositories/IStudentRepository';

export class VerifyPickup {
    private studentGuardianRepository: IStudentGuardianRepository;
    private guardianRepository: IGuardianRepository;
    private studentRepository: IStudentRepository;

    constructor(
        studentGuardianRepository: IStudentGuardianRepository,
        guardianRepository: IGuardianRepository,
        studentRepository: IStudentRepository
    ) {
        this.studentGuardianRepository = studentGuardianRepository;
        this.guardianRepository = guardianRepository;
        this.studentRepository = studentRepository;
    }

    async execute(studentId: number, guardianId: number): Promise<{
        isAuthorized: boolean;
        message: string;
    }> {
        if (!studentId || !guardianId) {
            throw new Error('Student ID and Guardian ID are required');
        }

        const student = await this.studentRepository.findById(studentId);
        if (!student) {
            return { isAuthorized: false, message: 'Student not found' };
        }

        const guardian = await this.guardianRepository.findById(guardianId);
        if (!guardian) {
            return { isAuthorized: false, message: 'Guardian not found' };
        }

        const relationship = await this.studentGuardianRepository.findByStudentAndGuardian(
            studentId,
            guardianId
        );

        if (!relationship) {
            return {
                isAuthorized: false,
                message: 'Guardian is not authorized to pick up this student'
            };
        }

        if (!guardian.faceEncodingUrl) {
            return {
                isAuthorized: false,
                message: 'Guardian has no face encoding registered'
            };
        }

        return {
            isAuthorized: true,
            message: 'Guardian is authorized for pickup'
        };
    }
}