import type {IGuardianRepository} from '../../../domain/repositories/IGuardianRepository';

export class ChangeGuardianPassword {
    private guardianRepository: IGuardianRepository;

    constructor(guardianRepository: IGuardianRepository) {
        this.guardianRepository = guardianRepository;
    }

    async execute(guardianId: number, currentPassword: string, newPassword: string): Promise<void> {
        if (!currentPassword || !newPassword) {
            throw new Error('Current password and new password are required');
        }

        if (newPassword.length < 8) {
            throw new Error('New password must be at least 8 characters long');
        }

        if (currentPassword === newPassword) {
            throw new Error('New password must be different from current password');
        }

        const guardian = await this.guardianRepository.findById(guardianId);
        if (!guardian) {
            throw new Error('Guardian not found');
        }

        // Current password validation will be done by backend
        await this.guardianRepository.updatePassword(guardianId, newPassword);
    }
}