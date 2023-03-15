import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setDoctor } from "../redux/doctorSlice";
import { hideLoading, showLoading } from "../redux/alertSlice";
function ProtectedRouteDoctor(props) {
  const { doctor } = useSelector((state) => state.doctor);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getDoctor = async () => {
    try {
        dispatch(showLoading())
      const response = await axios.post(
        "http://localhost:5000/api/doctor/get-doctor-info-by-id",
        {
          token: localStorage.getItem("token"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading())
      if (response.data.success) {
        dispatch(setDoctor(response.data.data));
        
      } else {
        localStorage.clear()
        navigate("/doctor-login");
      }
    } catch (error) {
      localStorage.clear()
      navigate("/doctor-login");
    }
  };

  useEffect(() => {
    if (!doctor) {
      getDoctor();
    }
  }, [doctor]);

  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/doctor-login" />;
  }
}

export default ProtectedRouteDoctor;
