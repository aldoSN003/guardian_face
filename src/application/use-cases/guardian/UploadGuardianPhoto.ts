import type {IGuardianRepository} from '../../../domain/repositories/IGuardianRepository';

export class UploadGuardianPhoto {
    private guardianRepository: IGuardianRepository;

    constructor(guardianRepository: IGuardianRepository) {
        this.guardianRepository = guardianRepository;
    }

    async execute(id: number, photo: File): Promise<string> {
        if (id <= 0) {
            throw new Error('Invalid guardian ID');
        }

        const existing = await this.guardianRepository.findById(id);
        if (!existing) {
            throw new Error('Guardian not found');
        }

        if (!this.isValidImageFile(photo)) {
            throw new Error('Invalid image file. Only JPG, PNG, and JPEG are allowed');
        }

        return await this.guardianRepository.uploadPhoto(id, photo);
    }

    private isValidImageFile(file: File): boolean {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        return validTypes.includes(file.type);
    }
}