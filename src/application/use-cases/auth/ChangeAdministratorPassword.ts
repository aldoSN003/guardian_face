import type {IAdministratorRepository} from '../../../domain/repositories/IAdministratorRepository';

export class ChangeAdministratorPassword {
    private administratorRepository: IAdministratorRepository;

    constructor(administratorRepository: IAdministratorRepository) {
        this.administratorRepository = administratorRepository;
    }

    async execute(adminId: number, currentPassword: string, newPassword: string): Promise<void> {
        if (!currentPassword || !newPassword) {
            throw new Error('Current password and new password are required');
        }

        if (newPassword.length < 8) {
            throw new Error('New password must be at least 8 characters long');
        }

        if (currentPassword === newPassword) {
            throw new Error('New password must be different from current password');
        }

        const admin = await this.administratorRepository.findById(adminId);
        if (!admin) {
            throw new Error('Administrator not found');
        }

        // Current password validation will be done by backend
        await this.administratorRepository.updatePassword(adminId, newPassword);
    }
}