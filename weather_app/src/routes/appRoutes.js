import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./../components/auth/login";
import Weather from "../components/pages/weather";

const isAuthenticated = () => {
    return !!localStorage.getItem("userId");
};

const ProtectedRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/" replace />;
};


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/weather" element={<ProtectedRoute element={<Weather />} />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
