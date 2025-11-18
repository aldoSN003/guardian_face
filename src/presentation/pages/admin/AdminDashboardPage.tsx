


import type { Administrator } from "../../../domain/entities/Administrator";
import {useAuth} from "../../context/AuthContext.tsx";
import Navbar from "../../components/Navbar.tsx";

export default function AdminDashboardPage() {
    const { user } = useAuth();
    const admin = user as Administrator;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar title="Panel de Administración" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Bienvenido, {admin.firstName}!
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-700">Usuario</h3>
                            <p className="text-2xl font-bold text-indigo-600">{admin.username}</p>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-700">Email</h3>
                            <p className="text-sm text-gray-600">{admin.email || "No configurado"}</p>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-700">Teléfono</h3>
                            <p className="text-sm text-gray-600">{admin.phone || "No configurado"}</p>
                        </div>
                    </div>

                    <div className="mt-8 space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Accesos Rápidos</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <a
                                href="/admin/manage-guardians"
                                className="block p-4 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition"
                            >
                                <h4 className="font-semibold text-indigo-900">Gestionar Tutores</h4>
                                <p className="text-sm text-indigo-700 mt-1">
                                    Ver, crear y editar tutores
                                </p>
                            </a>

                            <a
                                href="/admin/manage-students"
                                className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition"
                            >
                                <h4 className="font-semibold text-green-900">Gestionar Estudiantes</h4>
                                <p className="text-sm text-green-700 mt-1">
                                    Ver, crear y editar estudiantes
                                </p>
                            </a>

                            <a
                                href="/admin/verify-pickup"
                                className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition"
                            >
                                <h4 className="font-semibold text-purple-900">Verificar Recogida</h4>
                                <p className="text-sm text-purple-700 mt-1">
                                    Verificar identidad de tutores
                                </p>
                            </a>

                            <a
                                href="/admin/settings"
                                className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
                            >
                                <h4 className="font-semibold text-gray-900">Configuración</h4>
                                <p className="text-sm text-gray-700 mt-1">
                                    Ajustes de la cuenta
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

