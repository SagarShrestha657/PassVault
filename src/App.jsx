import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login'
import Signup from './pages/SignUp'
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Email_address from "./pages/Email_address"
import Email_verification from './pages/Email_verification';
import { useAuthStore } from './store/useAuthStore';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {

  const User = useAuthStore((state) => state.authUser)
  const token = useAuthStore((state) => state.token)

  
  const { checkAuth } = useAuthStore()

  // useEffect(() => {

  //   checkAuth()

  // }, [useLocation.pathname])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <>{token && User ? <><Navbar /> <Home /></> : <Navigate to="/login" replace />} </>
    },
    {
      path: "/login",
      element: <>{!token ? <Login /> : <Navigate to="/" replace />}</>
    },
    {
      path: "/signup",
      element: <>{!token ? <Signup /> : <Navigate to="/" replace />}</>
    },
    {
      path: "/emailverification",
      element: <>{User && !token ? <Email_verification /> : <Navigate to="/login" replace />}</>
    },
    {
      path: "/emailaddress",
      element: <>{!token ? <Email_address /> : <Navigate to="/" replace />}</>
    }
  ])






  return (
    <>

      <RouterProvider router={router} />

    </>
  )
}

export default App