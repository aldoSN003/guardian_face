import type {IStudentRepository} from '../../../domain/repositories/IStudentRepository';

export class DeleteStudent {
    private studentRepository: IStudentRepository;

    constructor(studentRepository: IStudentRepository) {
        this.studentRepository = studentRepository;
    }

    async execute(id: number): Promise<void> {
        if (id <= 0) {
            throw new Error('Invalid student ID');
        }

        const existing = await this.studentRepository.findById(id);
        if (!existing) {
            throw new Error('Student not found');
        }

        await this.studentRepository.delete(id);
    }
}