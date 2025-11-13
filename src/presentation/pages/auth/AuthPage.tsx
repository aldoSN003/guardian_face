// src/presentation/pages/auth/AuthPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/common/Card";
import RoleSelector from "../../components/auth/RoleSelector";
import ModeSelector from "../../components/auth/ModeSelector";
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";

type Rol = "admin" | "guardian";
type Modo = "login" | "register";

export default function AuthPage() {
    const [rol, setRol] = useState<Rol>("guardian");
    const [modo, setModo] = useState<Modo>("login");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rol === "admin") navigate("/admin/dashboard");
        else navigate("/guardian/dashboard");
    };

    const handleSkip = () => {
        navigate(rol === "admin" ? "/admin/dashboard" : "/guardian/dashboard");
    };

    const handleRoleChange = (newRole: Rol) => {
        setRol(newRole);
        setModo("login");
    };

    const toggleModo = () => {
        setModo((m) => (m === "login" ? "register" : "login"));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <Card className="w-full max-w-md" padding="lg">
                {/* Encabezado */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">GuardianFace</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {rol === "admin"
                            ? "Acceso para administradores"
                            : "Acceso o registro de tutores"}
                    </p>
                </div>

                {/* Selector de rol */}
                <RoleSelector selectedRole={rol} onRoleChange={handleRoleChange} />

                {/* Selector de modo (solo para tutores) */}
                {rol === "guardian" && (
                    <ModeSelector selectedMode={modo} onModeChange={setModo} />
                )}

                {/* Formulario */}
                {rol === "guardian" && modo === "register" ? (
                    <RegisterForm onSubmit={handleSubmit} onSkip={handleSkip} />
                ) : (
                    <LoginForm role={rol} onSubmit={handleSubmit} onSkip={handleSkip} />
                )}

                {/* Pie de página */}
                <div className="text-center mt-6">
                    {rol === "admin" ? (
                        <p className="text-xs text-gray-400">
                            Los administradores solo pueden iniciar sesión.
                        </p>
                    ) : modo === "login" ? (
                        <p className="text-xs text-gray-500">
                            ¿No tienes una cuenta?{" "}
                            <button
                                onClick={toggleModo}
                                className="text-indigo-600 hover:underline font-medium ml-1"
                            >
                                Regístrate aquí
                            </button>
                            .
                        </p>
                    ) : (
                        <p className="text-xs text-gray-500">
                            ¿Ya tienes una cuenta?{" "}
                            <button
                                onClick={toggleModo}
                                className="text-indigo-600 hover:underline font-medium ml-1"
                            >
                                Inicia sesión
                            </button>
                            .
                        </p>
                    )}
                </div>
            </Card>
        </div>
    );
}