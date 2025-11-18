// src/presentation/routes/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AuthPage from "../pages/auth/AuthPage";

import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import ManageGuardiansPage from "../pages/admin/ManageGuardiansPage";
import ManageStudentsPage from "../pages/admin/ManageStudentsPage";
import VerifyPickupPage from "../pages/admin/VerifyPickupPage";
import AdminSettingsPage from "../pages/admin/AdminSettingsPage";

import GuardianDashboardPage from "../pages/guardian/GuardianDashboardPage";
import ManageRelationshipsPage from "../pages/guardian/ManageRelationshipsPage";
import GuardianSettingsPage from "../pages/guardian/GuardianSettingsPage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Navigate to="/auth" />} />

                    {/* Public auth page */}
                    <Route path="/auth" element={<AuthPage />} />

                    {/* Protected Admin routes */}
                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedRoute allowedRole="admin">
                                <AdminDashboardPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/manage-guardians"
                        element={
                            <ProtectedRoute allowedRole="admin">
                                <ManageGuardiansPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/manage-students"
                        element={
                            <ProtectedRoute allowedRole="admin">
                                <ManageStudentsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/verify-pickup"
                        element={
                            <ProtectedRoute allowedRole="admin">
                                <VerifyPickupPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/settings"
                        element={
                            <ProtectedRoute allowedRole="admin">
                                <AdminSettingsPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Protected Guardian routes */}
                    <Route
                        path="/guardian/dashboard"
                        element={
                            <ProtectedRoute allowedRole="guardian">
                                <GuardianDashboardPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/guardian/manage-relationships"
                        element={
                            <ProtectedRoute allowedRole="guardian">
                                <ManageRelationshipsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/guardian/settings"
                        element={
                            <ProtectedRoute allowedRole="guardian">
                                <GuardianSettingsPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}