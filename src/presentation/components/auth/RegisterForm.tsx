// src/presentation/components/auth/RegisterForm.tsx
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../../infrastructure/api/authService";
import TextField from "../common/TextField";
import Button from "../common/Button";

export default function RegisterForm() {
    const navigate = useNavigate();
    const { loginAsGuardian } = useAuth();

    const [formData, setFormData] = useState({
        firstName: "",
        lastNamePaternal: "",
        lastNameMaternal: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        age: "",
        address: "",
    });
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        // Validate password length
        if (formData.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        setIsLoading(true);

        try {
            const guardian = await authService.registerGuardian({
                firstName: formData.firstName,
                lastNamePaternal: formData.lastNamePaternal,
                lastNameMaternal: formData.lastNameMaternal || undefined,
                email: formData.email,
                password: formData.password,
                phone: formData.phone || undefined,
                age: formData.age ? parseInt(formData.age) : undefined,
                address: formData.address || undefined,
            });

            // Auto-login after successful registration
            loginAsGuardian(guardian);
            navigate("/guardian/dashboard");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al registrar");
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

            <div className="grid grid-cols-1 gap-4">
                <TextField
                    type="text"
                    name="firstName"
                    placeholder="Nombre(s) *"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                />

                <div className="grid grid-cols-2 gap-4">
                    <TextField
                        type="text"
                        name="lastNamePaternal"
                        placeholder="Apellido paterno *"
                        value={formData.lastNamePaternal}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                    />
                    <TextField
                        type="text"
                        name="lastNameMaternal"
                        placeholder="Apellido materno"
                        value={formData.lastNameMaternal}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                </div>

                <TextField
                    type="email"
                    name="email"
                    placeholder="Correo electrónico *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                />

                <TextField
                    type="password"
                    name="password"
                    placeholder="Contraseña *"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                />

                <TextField
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmar contraseña *"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                />

                <div className="grid grid-cols-2 gap-4">
                    <TextField
                        type="tel"
                        name="phone"
                        placeholder="Teléfono"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    <TextField
                        type="number"
                        name="age"
                        placeholder="Edad"
                        value={formData.age}
                        onChange={handleChange}
                        disabled={isLoading}
                        min="18"
                        max="120"
                    />
                </div>

                <TextField
                    type="text"
                    name="address"
                    placeholder="Dirección"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={isLoading}
                />
            </div>

            <Button type="submit" fullWidth className="mt-4" disabled={isLoading}>
                {isLoading ? (
                    <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Registrando...
          </span>
                ) : (
                    "Registrarse como tutor"
                )}
            </Button>

            <p className="text-xs text-gray-500 text-center mt-2">
                * Campos obligatorios
            </p>
        </form>
    );
}