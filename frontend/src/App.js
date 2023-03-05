import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notifications from "./pages/Notifications";
import Doctorslist from "./pages/Admin/Doctorslist";
import Userslist from "./pages/Admin/Userslist";


function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <BrowserRouter>
      {loading && <div className="spinner-parent">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>

        <Route path="/login" element={<PublicRoute> <Login /></PublicRoute>} />

        <Route path="/register" element={<PublicRoute> <Register /> </PublicRoute>} />

        <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />

        <Route path="/apply-doctor" element={<ProtectedRoute> <ApplyDoctor /> </ProtectedRoute>} />

        <Route path="/notifications" element={<ProtectedRoute> <Notifications /> </ProtectedRoute>} />

        <Route path="/admin/doctorslist" element={<ProtectedRoute> <Doctorslist /> </ProtectedRoute>} />
        
        <Route path="/admin/userslist" element={<ProtectedRoute> <Userslist /> </ProtectedRoute>} />




      </Routes>

    </BrowserRouter>
  );
}

export default App;

