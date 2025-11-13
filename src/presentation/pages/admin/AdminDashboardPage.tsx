import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function AdminDashboardPage() {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar role="admin" />
            <h2>Admin Dashboard</h2>
            <p>Welcome, admin! Manage students and guardians here.</p>
            <button onClick={() => navigate("/admin/verify-pickup")}>Go to Verify Pickup</button>
        </div>
    );
}
