import type {Student} from '../../../domain/entities/Student';
import type{ IStudentRepository } from '../../../domain/repositories/IStudentRepository';

export class UpdateStudent {
    private studentRepository: IStudentRepository;

    constructor(studentRepository: IStudentRepository) {
        this.studentRepository = studentRepository;
    }

    async execute(id: number, student: Partial<Student>): Promise<Student> {
        if (id <= 0) {
            throw new Error('Invalid student ID');
        }

        const existing = await this.studentRepository.findById(id);
        if (!existing) {
            throw new Error('Student not found');
        }

        if (student.enrollmentNumber && student.enrollmentNumber !== existing.enrollmentNumber) {
            const duplicate = await this.studentRepository.findByEnrollmentNumber(student.enrollmentNumber);
            if (duplicate) {
                throw new Error('Another student with this enrollment number already exists');
            }
        }

        return await this.studentRepository.update(id, student);
    }
}