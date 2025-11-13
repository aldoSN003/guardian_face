// src/presentation/components/auth/RoleSelector.tsx


type Rol = "admin" | "guardian";

interface RoleSelectorProps {
    selectedRole: Rol;
    onRoleChange: (role: Rol) => void;
}

export default function RoleSelector({ selectedRole, onRoleChange }: RoleSelectorProps) {
    return (
        <div className="flex justify-center gap-3 mb-6">
            <button
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                    selectedRole === "guardian"
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-gray-600 border-gray-300 hover:border-indigo-300"
                }`}
                onClick={() => onRoleChange("guardian")}
            >
                Tutor
            </button>
            <button
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                    selectedRole === "admin"
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-gray-600 border-gray-300 hover:border-indigo-300"
                }`}
                onClick={() => onRoleChange("admin")}
            >
                Administrador
            </button>
        </div>
    );
}