import type {PickupLog} from '../../../domain/entities/PickupLog';
import type {IPickupLogRepository} from '../../../domain/repositories/IPickupLogRepository';

export class GetPickupHistory {
    private pickupLogRepository: IPickupLogRepository;

    constructor(pickupLogRepository: IPickupLogRepository) {
        this.pickupLogRepository = pickupLogRepository;
    }

    async executeAll(): Promise<PickupLog[]> {
        return await this.pickupLogRepository.findAll();
    }

    async executeByStudent(studentId: number): Promise<PickupLog[]> {
        if (studentId <= 0) {
            throw new Error('Invalid student ID');
        }

        return await this.pickupLogRepository.findByStudent(studentId);
    }

    async executeByGuardian(guardianId: number): Promise<PickupLog[]> {
        if (guardianId <= 0) {
            throw new Error('Invalid guardian ID');
        }

        return await this.pickupLogRepository.findByGuardian(guardianId);
    }

    async executeByDate(date: Date): Promise<PickupLog[]> {
        if (!date) {
            throw new Error('Date is required');
        }

        return await this.pickupLogRepository.findByDate(date);
    }

    async executeByDateRange(startDate: Date, endDate: Date): Promise<PickupLog[]> {
        if (!startDate || !endDate) {
            throw new Error('Start date and end date are required');
        }

        if (startDate > endDate) {
            throw new Error('Start date must be before end date');
        }

        return await this.pickupLogRepository.findByDateRange(startDate, endDate);
    }

    async executeFailedAttempts(): Promise<PickupLog[]> {
        return await this.pickupLogRepository.findFailedAttempts();
    }
}