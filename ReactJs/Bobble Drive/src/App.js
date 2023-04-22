import './App.css';
import Register from './components/Auth/Register';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from './components/Profile/Profile';
import Login from './components/Auth/Login';
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from './components/Auth/ForgotPassword';
import UpdateProfile from './components/Profile/UpdateProfile';
import Dashboard from './components/B-Drive/Dashboard';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Drive Routes */}
                    <Route exact path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
                    <Route exact path="/folder/:folderId" element={<PrivateRoute><Dashboard/></PrivateRoute>} />

                    {/* User Routes */}
                    <Route path="/user" element={<PrivateRoute><Profile /></PrivateRoute>} />
                    <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />

                    {/* Auth Routes */}
                    <Route path="/signup" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
