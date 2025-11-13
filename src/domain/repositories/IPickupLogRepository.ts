import type {PickupLog} from '../entities/PickupLog';

export interface IPickupLogRepository {
    create(pickupLog: PickupLog): Promise<PickupLog>;
    findById(id: number): Promise<PickupLog | null>;
    findAll(): Promise<PickupLog[]>;
    findByStudent(studentId: number): Promise<PickupLog[]>;
    findByGuardian(guardianId: number): Promise<PickupLog[]>;
    findByDateRange(startDate: Date, endDate: Date): Promise<PickupLog[]>;
    findByDate(date: Date): Promise<PickupLog[]>;
    findFailedAttempts(): Promise<PickupLog[]>;

}