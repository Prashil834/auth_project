import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import "./index.css";
import "./App.css";

function App() {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/signin" element={<SignIn />}></Route>
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                ></Route>
                <Route path="*" element={<Navigate to="/" replace />}></Route>
            </Routes>
        </div>
    );
}

export default App;
