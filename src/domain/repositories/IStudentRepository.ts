import type {Student} from '../entities/Student';

export interface IStudentRepository {
    create(student: Student): Promise<Student>;
    findById(id: number): Promise<Student | null>;
    findAll(): Promise<Student[]>;
    findByEnrollmentNumber(enrollmentNumber: string): Promise<Student | null>;
    update(id: number, student: Partial<Student>): Promise<Student>;
    delete(id: number): Promise<void>;
    uploadPhoto(id: number, photo: File): Promise<string>;
}