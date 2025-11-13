// src/presentation/components/auth/ModeSelector.tsx
type Modo = "login" | "register";

interface ModeSelectorProps {
    selectedMode: Modo;
    onModeChange: (mode: Modo) => void;
}

export default function ModeSelector({ selectedMode, onModeChange }: ModeSelectorProps) {
    return (
        <div className="flex justify-center gap-3 mb-6">
            <button
                className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                    selectedMode === "login"
                        ? "text-indigo-700 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-indigo-600"
                }`}
                onClick={() => onModeChange("login")}
            >
                Iniciar sesión
            </button>
            <button
                className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                    selectedMode === "register"
                        ? "text-indigo-700 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-indigo-600"
                }`}
                onClick={() => onModeChange("register")}
            >
                Registrarse
            </button>
        </div>
    );
}