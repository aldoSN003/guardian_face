// src/presentation/components/auth/LoginForm.tsx
// src/presentation/components/auth/LoginForm.tsx
import type {FormEvent} from "react";
import TextField from "../common/TextField";
import Button from "../common/Button";

type Rol = "admin" | "guardian";

interface LoginFormProps {
    role: Rol;
    onSubmit: (e: FormEvent) => void;
    onSkip: () => void;
}

export default function LoginForm({ role, onSubmit, onSkip }: LoginFormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            {role === "admin" ? (
                <>
                    <TextField
                        type="text"
                        placeholder="Usuario del administrador"
                        required
                    />
                    <TextField
                        type="password"
                        placeholder="Contraseña"
                        required
                    />
                </>
            ) : (
                <>
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
                </>
            )}

            <Button type="submit" fullWidth className="mt-4">
                {role === "admin"
                    ? "Iniciar sesión como administrador"
                    : "Iniciar sesión como tutor"}
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