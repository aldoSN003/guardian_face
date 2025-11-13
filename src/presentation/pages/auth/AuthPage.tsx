import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    const toggleModo = () => {
        if (rol === "admin") return;
        setModo((m) => (m === "login" ? "register" : "login"));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                {/* Encabezado */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">GuardianFace</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {rol === "admin"
                            ? "Acceso para administradores"
                            : "Acceso o registro de tutores"}
                    </p>
                </div>

                {/* Cambio de rol */}
                <div className="flex justify-center gap-3 mb-6">
                    <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                            rol === "guardian"
                                ? "bg-indigo-600 text-white border-indigo-600"
                                : "bg-white text-gray-600 border-gray-300 hover:border-indigo-300"
                        }`}
                        onClick={() => {
                            setRol("guardian");
                            setModo("login");
                        }}
                    >
                        Tutor
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                            rol === "admin"
                                ? "bg-indigo-600 text-white border-indigo-600"
                                : "bg-white text-gray-600 border-gray-300 hover:border-indigo-300"
                        }`}
                        onClick={() => {
                            setRol("admin");
                            setModo("login");
                        }}
                    >
                        Administrador
                    </button>
                </div>

                {/* Modo tutor: inicio o registro */}
                {rol === "guardian" && (
                    <div className="flex justify-center gap-3 mb-6">
                        <button
                            className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                                modo === "login"
                                    ? "text-indigo-700 border-b-2 border-indigo-600"
                                    : "text-gray-500 hover:text-indigo-600"
                            }`}
                            onClick={() => setModo("login")}
                        >
                            Iniciar sesión
                        </button>
                        <button
                            className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                                modo === "register"
                                    ? "text-indigo-700 border-b-2 border-indigo-600"
                                    : "text-gray-500 hover:text-indigo-600"
                            }`}
                            onClick={() => setModo("register")}
                        >
                            Registrarse
                        </button>
                    </div>
                )}

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {rol === "admin" ? (
                        <>
                            <input
                                type="text"
                                placeholder="Usuario del administrador"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </>
                    ) : (
                        <>
                            {modo === "register" && (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Nombre(s)"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Apellido paterno"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Apellido materno (opcional)"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Edad"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Teléfono"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Dirección"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </>
                            )}
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </>
                    )}

                    <button
                        type="submit"
                        className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition duration-150"
                    >
                        {rol === "admin"
                            ? "Iniciar sesión como administrador"
                            : modo === "login"
                                ? "Iniciar sesión como tutor"
                                : "Registrar nuevo tutor"}
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            navigate(rol === "admin" ? "/admin/dashboard" : "/guardian/dashboard")
                        }
                        className="w-full mt-2 border border-gray-300 text-gray-600 hover:bg-gray-50 py-2 rounded-lg text-sm"
                    >
                        Omitir (mock de navegación)
                    </button>
                </form>

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
            </div>
        </div>
    );
}
