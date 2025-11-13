import type {PickupLog, CreatePickupLogDto} from '../../../domain/entities/PickupLog';
import type {IPickupLogRepository} from '../../../domain/repositories/IPickupLogRepository';

export class RecordPickup {
    private pickupLogRepository: IPickupLogRepository;
    private readonly MIN_CONFIDENCE_THRESHOLD = 85; // Minimum confidence for successful pickup

    constructor(pickupLogRepository: IPickupLogRepository) {
        this.pickupLogRepository = pickupLogRepository;
    }

    async execute(pickupLog: CreatePickupLogDto): Promise<PickupLog> {
        if (!pickupLog.studentId || !pickupLog.guardianId) {
            throw new Error('Student ID and Guardian ID are required');
        }

        if (pickupLog.faceMatchConfidence !== undefined) {
            if (pickupLog.faceMatchConfidence < 0 || pickupLog.faceMatchConfidence > 100) {
                throw new Error('Face match confidence must be between 0 and 100');
            }

            // If marked as successful, ensure confidence meets threshold
            if (pickupLog.wasSuccessful && pickupLog.faceMatchConfidence < this.MIN_CONFIDENCE_THRESHOLD) {
                throw new Error(`Face match confidence (${pickupLog.faceMatchConfidence}%) is below the minimum threshold (${this.MIN_CONFIDENCE_THRESHOLD}%). Pickup cannot be marked as successful.`);
            }
        }

        return await this.pickupLogRepository.create(pickupLog);
    }
}
