// src/presentation/components/auth/LoginForm.tsx
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../../infrastructure/api/authService";
import TextField from "../common/TextField";
import Button from "../common/Button";

type Rol = "admin" | "guardian";

interface LoginFormProps {
    role: Rol;
}

export default function LoginForm({ role }: LoginFormProps) {
    const navigate = useNavigate();
    const { loginAsAdmin, loginAsGuardian } = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            if (role === "admin") {
                // Admin login
                const admin = await authService.loginAdministrator({
                    username: formData.username,
                    password: formData.password,
                });
                loginAsAdmin(admin);
                navigate("/admin/dashboard");
            } else {
                // Guardian login
                const guardian = await authService.loginGuardian({
                    email: formData.email,
                    password: formData.password,
                });
                loginAsGuardian(guardian);
                navigate("/guardian/dashboard");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al iniciar sesión");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            {role === "admin" ? (
                <>
                    <TextField
                        type="text"
                        name="username"
                        placeholder="Usuario del administrador"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                    />
                    <TextField
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                    />
                </>
            ) : (
                <>
                    <TextField
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                    />
                    <TextField
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                    />
                </>
            )}

            <Button type="submit" fullWidth className="mt-4" disabled={isLoading}>
                {isLoading ? (
                    <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Iniciando sesión...
          </span>
                ) : (
                    role === "admin"
                        ? "Iniciar sesión como administrador"
                        : "Iniciar sesión como tutor"
                )}
            </Button>
        </form>
    );
}