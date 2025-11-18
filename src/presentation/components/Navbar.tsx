// src/presentation/components/Navbar.tsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./common/Button";

interface NavbarProps {
    title?: string;
}

export default function Navbar({ title = "GuardianFace" }: NavbarProps) {
    const navigate = useNavigate();
    const { user, role, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/auth");
    };

    const getUserName = () => {
        if (!user) return "";
        if ('username' in user) {
            // Administrator
            return user.username;
        } else {
            // Guardian
            return `${user.firstName} ${user.lastNamePaternal}`;
        }
    };

    const getRoleName = () => {
        return role === "admin" ? "Administrador" : "Tutor";
    };

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left side - Title */}
                    <div className="flex items-center">
                        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
                    </div>

                    {/* Right side - User info and logout */}
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{getUserName()}</p>
                            <p className="text-xs text-gray-500">{getRoleName()}</p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={handleLogout}
                            className="text-sm"
                        >
                            Cerrar sesión
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}