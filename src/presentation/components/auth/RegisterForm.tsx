// src/presentation/components/auth/RegisterForm.tsx
// src/presentation/components/auth/RegisterForm.tsx
import type {FormEvent} from "react";
import TextField from "../common/TextField";
import Button from "../common/Button";

interface RegisterFormProps {
    onSubmit: (e: FormEvent) => void;
    onSkip: () => void;
}

export default function RegisterForm({ onSubmit, onSkip }: RegisterFormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <TextField
                type="text"
                placeholder="Nombre(s)"
                required
            />
            <TextField
                type="text"
                placeholder="Apellido paterno"
                required
            />
            <TextField
                type="text"
                placeholder="Apellido materno (opcional)"
            />
            <TextField
                type="number"
                placeholder="Edad"
            />
            <TextField
                type="text"
                placeholder="Teléfono"
            />
            <TextField
                type="text"
                placeholder="Dirección"
            />
            <TextField
                type="email"
                placeholder="Correo electrónico"
                required
            />
            <TextField
                type="password"
                placeholder="Contraseña"
                required
            />

            <Button type="submit" fullWidth className="mt-4">
                Registrar nuevo tutor
            </Button>

            <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={onSkip}
                className="mt-2"
            >
                Omitir (mock de navegación)
            </Button>
        </form>
    );
}