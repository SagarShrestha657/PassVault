import React, { useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login'
import Signup from './pages/SignUp'
import { createBrowserRouter, RouterProvider, } from 'react-router-dom'
import Home from './pages/Home'
import Email_address from "./pages/Email_address"
import Email_verification from './pages/Email_verification';
import { useAuthStore } from './store/useAuthStore';
import { Navigate } from 'react-router-dom';
import Trash from './pages/Trash';

function App() {

  const {authUser,token}=useAuthStore()
  
  const router = createBrowserRouter([
    {
      path: "/",
      element:<>{token && authUser ? <><Navbar /> <Home /></> : <Navigate to="/login" replace/>}</>
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
      element: <>{authUser && !token ? <Email_verification /> : <Navigate to="/login" replace />}</>
    },
    {
      path: "/emailaddress",
      element: <>{!token ? <Email_address /> : <Navigate to="/" replace />}</>
    },
    {
      path: "/trash",
      element: <>{token && authUser ? <><Navbar /> <Trash /></> : <Navigate to="/login" replace/>}</>
    },
  ])






  return (
    <>

      <RouterProvider router={router} />

    </>
  )
}

export default App