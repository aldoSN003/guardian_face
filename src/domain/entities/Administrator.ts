export interface Administrator {
    administratorId?: number;
    firstName: string;
    lastNamePaternal: string;
    lastNameMaternal?: string;
    username: string;
    password: string;
    email?: string;
    phone?: string;
}