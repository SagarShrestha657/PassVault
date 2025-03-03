import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { axiosInstance } from "../lib/axios";

const Login = () => {
  const [login, setlogin] = useState({ email: "", password: "" })


  const navigate = useNavigate();
  const [error, seterror] = useState()

  const { user, settoken } = useAuthStore()

  const login_handlechange = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value })
  }



  const savelogin = async () => {
    try {
      let res = await axiosInstance.post("/login", login)
      user(res.data)
      //settoken()
      navigate("/")
    } catch (error) {
      if (error.response.data.message) {
        seterror(error.response.data.message)
      }
    }
    setlogin({ email: "", password: "" })
  }


  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-[url('public/background_Image.png')]  bg-cover">

        <div className="w-72  h-fit  my-auto sm:w-96 shadow-2xl rounded-lg">
          <h2 className="mt-3 text-center font-bold text-2xl text-white">
            Creative Threads
          </h2>
          <p className="my-2  text-center font-thin text-white">
            {" "}
            A Thread that Connect Creativity
          </p>
          <div className="flex flex-col bg-slate-300 rounded-md h-fit  ">
            <div className="flex flex-row mb-3  h-10 w-full">
              <div
                className={
                  "text-center font-semibold  w-1/2 pt-1 border-b-2 border-black cursor-pointer"
                }
              >
                Login
              </div>
              <div
                className={
                  "text-center font-semibold w-1/2 pt-1 cursor-pointer"
                }
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </div>
            </div>
            <label className="pl-4 mb-1 font-semibold">Email</label>
            <input
              className="bg-white  outline-none  rounded-md mx-4 mb-2 pl-2 "
              type="text"
              required
              value={login.email}
              onChange={login_handlechange}
              name="email"
            />
            <label className="pl-4 mb-1 font-semibold ">Password</label>
            <input
              className="bg-white   outline-none rounded-md mx-4 mb-2 pl-2"
              type="password"
              required
              value={login.password}
              onChange={login_handlechange}
              name="password"
            />
            <div className="flex flex-row mb-3 w-full justify-between">
              <div className=" pl-4 text-xs">
                {error &&
                  <div className="text-red-700 font-light text-xs ">
                    {error}
                  </div>}
              </div>
              <div className="pr-4 text-xs cursor-pointer" onClick={() => navigate("/emailaddress")}>Forget Password</div>
            </div>
            <button
              className="bg-black mx-4 rounded-md text-white h-8 mb-4  cursor-pointer  "
              onClick={savelogin}
            >
              Login
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default Login;
