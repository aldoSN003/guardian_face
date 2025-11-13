import type {Student, CreateStudentDto} from '../../../domain/entities/Student';
import type{ IStudentRepository } from '../../../domain/repositories/IStudentRepository';

export class CreateStudent {
    private studentRepository: IStudentRepository;

    constructor(studentRepository: IStudentRepository) {
        this.studentRepository = studentRepository;
    }

    async execute(student: CreateStudentDto): Promise<Student> {
        if (!student.firstName || !student.lastNamePaternal) {
            throw new Error('First name and paternal last name are required');
        }

        if (!student.enrollmentNumber) {
            throw new Error('Enrollment number is required');
        }

        const existing = await this.studentRepository.findByEnrollmentNumber(student.enrollmentNumber);
        if (existing) {
            throw new Error('Student with this enrollment number already exists');
        }

        return await this.studentRepository.create(student);
    }
}