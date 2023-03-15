import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/User/Login'
import Register from './pages/User/Register'
import { Toaster } from "react-hot-toast";
import Home from "./pages/User/Home";
import { useSelector } from "react-redux";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import ApplyDoctor from "./pages/Doctor/ApplyDoctor";
import Notifications from "./pages/Notifications";
import Doctorslist from "./pages/Admin/Doctorslist";
import Userslist from "./pages/Admin/Userslist";
import DoctorRegistration from "./pages/Doctor/DoctorRegistration";
import DoctorLogin from "./pages/Doctor/DoctorLogin";
import ProtectedRouteDoctor from "./components/ProtectedRouteDoctor";
import PublicRouteDoctor from "./components/PublicRouteDoctor";
import DoctorHome from "./pages/Doctor/DoctorHome";


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

        {/* <Route path="/apply-doctor" element={ <ApplyDoctor /> } /> */}

        <Route path="/notifications" element={<ProtectedRoute> <Notifications /> </ProtectedRoute>} />

        <Route path="/admin/doctorslist" element={<ProtectedRoute> <Doctorslist /> </ProtectedRoute>} />
        
        <Route path="/admin/userslist" element={<ProtectedRoute> <Userslist /> </ProtectedRoute>} />

        

        <Route path="/doctor-login" element={ <DoctorLogin />} />

        <Route path="/doctor-register" element={<PublicRouteDoctor><DoctorRegistration/></PublicRouteDoctor>} />
        <Route path="/doctor/home" element={<ProtectedRouteDoctor><DoctorHome/></ProtectedRouteDoctor>}/>
        <Route path="/doctor" element={<ProtectedRouteDoctor><ApplyDoctor/></ProtectedRouteDoctor>} />

       


      </Routes>

    </BrowserRouter>
  );
}

export default App;

