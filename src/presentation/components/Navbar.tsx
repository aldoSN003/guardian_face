import { Link } from "react-router-dom";

interface NavbarProps {
    role: "admin" | "guardian";
}

export default function Navbar({ role }: NavbarProps) {
    return (
        <nav style={{ background: "#eee", padding: "10px" }}>
            {role === "admin" ? (
                <>
                    <Link to="/admin/dashboard">Dashboard</Link> |{" "}
                    <Link to="/admin/manage-guardians">Guardians</Link> |{" "}
                    <Link to="/admin/manage-students">Students</Link> |{" "}
                    <Link to="/admin/verify-pickup">Verify Pickup</Link> |{" "}
                    <Link to="/admin/settings">Settings</Link>
                </>
            ) : (
                <>
                    <Link to="/guardian/dashboard">Dashboard</Link> |{" "}
                    <Link to="/guardian/manage-relationships">Relationships</Link> |{" "}
                    <Link to="/guardian/settings">Settings</Link>
                </>
            )}
        </nav>
    );
}
