import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const AdminProtected = ({ children }) => {

    const { admin } = useSelector(state => state.auth)

    return admin ? children : <Navigate to="/admin-login" />

}

export default AdminProtected