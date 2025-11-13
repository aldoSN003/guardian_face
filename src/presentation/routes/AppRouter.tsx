import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
            <Routes>
                <Route path="/" element={<Navigate to="/auth" />} />

                {/* Single auth page (switch admin <-> guardian, login/register) */}
                <Route path="/auth" element={<AuthPage />} />

                {/* Admin routes */}
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                <Route path="/admin/manage-guardians" element={<ManageGuardiansPage />} />
                <Route path="/admin/manage-students" element={<ManageStudentsPage />} />
                <Route path="/admin/verify-pickup" element={<VerifyPickupPage />} />
                <Route path="/admin/settings" element={<AdminSettingsPage />} />

                {/* Guardian routes */}
                <Route path="/guardian/dashboard" element={<GuardianDashboardPage />} />
                <Route path="/guardian/manage-relationships" element={<ManageRelationshipsPage />} />
                <Route path="/guardian/settings" element={<GuardianSettingsPage />} />
            </Routes>
        </BrowserRouter>
    );
}
