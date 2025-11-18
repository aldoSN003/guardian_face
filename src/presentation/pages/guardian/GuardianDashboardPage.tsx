
// src/presentation/pages/guardian/GuardianDashboardPage.tsx
// Example for Guardian dashboard

import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import type { Guardian } from "../../../domain/entities/Guardian";

export default function GuardianDashboardPage() {
    const { user } = useAuth();
    const guardian = user as Guardian;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar title="Panel de Tutor" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Bienvenido, {guardian.firstName} {guardian.lastNamePaternal}!
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-700">Email</h3>
                            <p className="text-sm text-gray-600">{guardian.email}</p>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-700">Teléfono</h3>
                            <p className="text-sm text-gray-600">{guardian.phone || "No configurado"}</p>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-700">Edad</h3>
                            <p className="text-sm text-gray-600">{guardian.age || "No especificada"}</p>
                        </div>
                    </div>

                    <div className="mt-8 space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Accesos Rápidos</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <a
                                href="/guardian/manage-relationships"
                                className="block p-4 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition"
                            >
                                <h4 className="font-semibold text-indigo-900">Mis Estudiantes</h4>
                                <p className="text-sm text-indigo-700 mt-1">
                                    Ver estudiantes asociados
                                </p>
                            </a>

                            <a
                                href="/guardian/settings"
                                className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
                            >
                                <h4 className="font-semibold text-gray-900">Mi Perfil</h4>
                                <p className="text-sm text-gray-700 mt-1">
                                    Actualizar información personal
                                </p>
                            </a>
                        </div>
                    </div>

                    {guardian.address && (
                        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h3 className="font-semibold text-blue-900">Dirección</h3>
                            <p className="text-sm text-blue-700 mt-1">{guardian.address}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}