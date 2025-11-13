export interface PickupLog {
    pickupLogId?: number;
    studentId: number;
    guardianId: number;
    pickupDateTime?: Date;
    faceMatchConfidence?: number;
    wasSuccessful: boolean;
    capturedPhotoUrl?: string;
    notes?: string;
}

export type CreatePickupLogDto = Omit<PickupLog, 'pickupLogId' | 'pickupDateTime'>;