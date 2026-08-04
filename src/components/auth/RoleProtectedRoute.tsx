import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

interface RoleProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: string[];
}

const RoleProtectedRoute = ({
    children,
    allowedRoles,
}: RoleProtectedRouteProps) => {
    const { role } = useAuth();

    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default RoleProtectedRoute;
