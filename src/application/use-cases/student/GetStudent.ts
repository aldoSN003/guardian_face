import type { Student } from '../../../domain/entities/Student';
import type{ IStudentRepository } from '../../../domain/repositories/IStudentRepository';

export class GetStudent {
    private studentRepository: IStudentRepository;

    constructor(studentRepository: IStudentRepository) {
        this.studentRepository = studentRepository;
    }

    async execute(id: number): Promise<Student | null> {
        if (id <= 0) {
            throw new Error('Invalid student ID');
        }

        return await this.studentRepository.findById(id);
    }

    async executeAll(): Promise<Student[]> {
        return await this.studentRepository.findAll();
    }

    async executeByEnrollmentNumber(enrollmentNumber: string): Promise<Student | null> {
        if (!enrollmentNumber) {
            throw new Error('Enrollment number is required');
        }

        return await this.studentRepository.findByEnrollmentNumber(enrollmentNumber);
    }
}