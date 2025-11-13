export interface Guardian {
    guardianId?: number;
    firstName: string;
    lastNamePaternal: string;
    lastNameMaternal?: string;
    age?: number;
    phone?: string;
    email?: string;
    password?: string;
    address?: string;
    photographUrl?: string;
    faceEncodingUrl?: string;
    lastUpdate?: Date;
    registrationDate?: Date;
}

export type CreateGuardianDto = Omit<Guardian, 'guardianId' | 'lastUpdate' | 'registrationDate'>;