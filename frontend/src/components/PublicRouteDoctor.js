import React from 'react'
import { Navigate } from 'react-router-dom'

function PublicRouteDoctor(props) {
    if (localStorage.getItem('token')) {

        return <Navigate to="/doctor/home" />
    } else {
        return props.children
    }
}
export default PublicRouteDoctor