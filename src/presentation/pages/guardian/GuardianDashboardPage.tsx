import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function GuardianDashboardPage() {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar role="guardian" />
            <h2>Guardian Dashboard</h2>
            <p>Welcome! Manage your students and relationships.</p>
            <button onClick={() => navigate("/guardian/manage-relationships")}>
                Go to Manage Relationships
            </button>
        </div>
    );
}
