export interface Student {
    studentId?: number;
    firstName: string;
    lastNamePaternal: string;
    lastNameMaternal?: string;
    enrollmentNumber: string;
    birthDate?: Date;
    gender?: 'M' | 'F';
    grade?: string;
    groupName?: string;
    photographUrl?: string;
}

export type CreateStudentDto = Omit<Student, 'studentId'>;