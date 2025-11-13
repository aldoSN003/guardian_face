import type {StudentGuardian} from '../entities/StudentGuardian';

export interface IStudentGuardianRepository {
    assign(studentGuardian: StudentGuardian): Promise<StudentGuardian>;
    remove(studentId: number, guardianId: number): Promise<void>;
    findByStudent(studentId: number): Promise<StudentGuardian[]>;
    findByGuardian(guardianId: number): Promise<StudentGuardian[]>;
    findByStudentAndGuardian(studentId: number, guardianId: number): Promise<StudentGuardian | null>;
    updateRelationship(studentId: number, guardianId: number, relationship: string): Promise<StudentGuardian>;
}