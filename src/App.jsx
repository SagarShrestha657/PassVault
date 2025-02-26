import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login'
import Signup from './components/SignUp'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Email_address from "./components/Email_address"
import Email_verification from './components/Email_verification';
import { useAuthStore } from './store/useAuthStore';
import { Navigate } from 'react-router-dom';

function App() {
  
  const User = useAuthStore((state) => state.authUser)


  const {checkAuth} = useAuthStore()
  
  const router=createBrowserRouter([
    {
      path:"/",
      element:<>{checkAuth&&User?<><Navbar/> <Home/></>:<Navigate to="login" replace/>} </>
    },
    {
      path:"/login",
      element:<>{!User&&<Login/>}</>
    },
    {
      path:"/signup",
      element:<>{!User&&<Signup/>}</>
    },
    {
      path:"/emailverification",
      element:<>{User?<Email_verification/>:<Navigate to="login" replace/>}</>
    },
    {
      path:"/emailaddress",
      element:<>{!User&&<Email_address/>}</>
    }
  ])



  


  return (
    <>  
      
      <RouterProvider router={router}/>
      
    </>
  )
}

export default App