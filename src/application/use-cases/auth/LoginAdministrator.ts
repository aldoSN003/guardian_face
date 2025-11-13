import type {Administrator} from '../../../domain/entities/Administrator';
import type {IAdministratorRepository} from '../../../domain/repositories/IAdministratorRepository';

export class LoginAdministrator {
    private administratorRepository: IAdministratorRepository;

    constructor(administratorRepository: IAdministratorRepository) {
        this.administratorRepository = administratorRepository;
    }

    async execute(username: string, password: string): Promise<Administrator> {
        if (!username || !password) {
            throw new Error('Username and password are required');
        }

        const admin = await this.administratorRepository.findByUsername(username);

        if (!admin) {
            throw new Error('Invalid username or password');
        }

        // Password validation will be done by backend
        // This use case just validates the input and calls the repository

        return admin;
    }
}