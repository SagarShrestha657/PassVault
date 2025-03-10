import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { axiosInstance } from "../lib/axios";
import { FaCopy, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useAuthStore } from '../store/useAuthStore';

const Home = () => {
    const [form, setform] = useState({ Website: "", username: "", password: "", })
    const [logins, setlogins] = useState([])
    const [buttoncontent, setbuttoncontent] = useState(<FaEyeSlash />)
    const ref = useRef()
    const { checkAuth } = useAuthStore()

    useEffect(() => {
        checkAuth()
        datas()
    }, [])

    useEffect(() => {
        setInterval(() => {
            checkAuth()
        }, 1000 * 60 * 2)
    })

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const changetype = () => {
        if (ref.current.type === "password") {
            ref.current.type = "text"
            setbuttoncontent(<FaEye />)

        } else {
            ref.current.type = "password"
            setbuttoncontent(<FaEyeSlash />)
        }
    }

    const hidepassword = (psd) => {
        let len = psd.length
        let hidden = "*"
        for (let i = 0; i < len; i++) {

            hidden = hidden + "*"
        }
        return hidden
    }


    const datas = async () => {
        try {
            const res = await axiosInstance.get("/logins/getall", { withCredentials: true })
            setlogins(res.data.logins)
        } catch (error) {
            toast(error.response.data.message)
        }
    }

    const savepassword = async () => {
        try {
            if (form.username.length > 3 && form.Website.length > 3 && form.password.length > 3) {
                console.log(form)
                const res = await axiosInstance.post("/logins/add", form, { withCredentials: true, })
                setlogins([...logins, form])
                setform({ Website: "", username: "", password: "" })
                toast(res.data.message);
            }
            else {
                toast("Login not Saved")
            }
        } catch (error) {
            toast(error.response.data.message)
        }
    }


    const editpassword = async (_id) => {
        try {
            await axiosInstance.delete("/logins/deletelogin", { data: { _id } }, { withCredentials: true })
            setform(logins.filter(item => item._id === _id)[0])
            setlogins(logins.filter(item => item._id !== _id))
        } catch (error) {
            toast(error.response.data.message)
        }

    };

    const deletepassword = async (_id) => {
        try {
            let d = confirm("do yo want to delete this Login")
            if (d) {
                const data = { _id }
                const res = await axiosInstance.patch("/logins/movetotrash", data, { withCredentials: true })
                setlogins(logins.filter(item => item._id !== _id))
                toast(res.data.message);
            }
        } catch (error) {
            toast(error.response.data.message)
        }
    }

    const coptext = (text) => {
        toast("Copied to Clickboard!");
        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <div className='bg-gray-100 w-full h-screen pt-2'>
                <div className='w-3/4 mx-auto h-fit pb-2 bg-white shadow-2xl rounded-lg  '>
                    <div>
                        <h1 className='text-center text-3xl my-3 font-semibold text-gray-800 pt-2'>LOGIN MANAGER</h1>
                        <h1 className='text-center text-gray-500 my-3'>Manage your setlogins</h1>
                    </div>
                    <div className='flex flex-col gap-4 mb-2'>
                        <div className='mx-5 '>
                            <input name="Website" value={form.Website} onChange={(e) => { handlechange(e) }} placeholder='Website or App ' className='border border-gray-300  w-full px-3  rounded-md  outline-blue-500' type="text" />
                        </div>
                        <div className='  mx-5 flex gap-4 justify-between max-md:flex-col'>
                            <input type="text" name="username" value={form.username} onChange={handlechange} placeholder='Username' className='border border-gray-300  w-full px-3  rounded-md  outline-blue-500' />
                            <div className='relative'>
                                <input type="password" ref={ref} name="password" value={form.password} onChange={handlechange} placeholder='Password' className='border border-gray-300 w-fit  px-3 rounded-md outline-blue-500 max-md:w-full' />
                                <button className='absolute right-3 cursor-pointer w-6 pl-3  bg-white h-4 text-xs mt-1' onClick={changetype}>{buttoncontent}</button>
                            </div>
                        </div>

                        <button className=' bg-blue-500 text-white hover:bg-blue-600  mx-5  rounded-md' onClick={savepassword}>Save</button>
                    </div >
                    <div className='pl-2  font-semibold text-xL'>YOUR Logins</div>
                    {logins.length === 0 && <div className='pl-5 m-4' >No Logins to Show</div>}
                    {logins.length !== 0 &&
                        <div className='w-full h-96  overflow-auto scrollbar-hide'>
                            <table className='w-full table-fixed  border border-gray-300 shadow-md rounded-md '>
                                <thead >
                                    <tr className='flex w-full bg-blue-500 text-white '>
                                        <th className='  w-[30%]'>Website</th>
                                        <th className=' w-[30%]'>Username</th>
                                        <th className=' w-[30%]'>Password</th>
                                        <th className=' w-[10%]'>Action</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {logins.map((item, index) => {
                                        return <tr key={index} className='odd:bg-gray-100 even:bg-white  flex w-full'>
                                            <th className='border border-blue-400 w-[30%]  flex justify-between'>
                                                <h3 className=' overflow-auto  pl-2 ' >  <a href="item.site">{item.Website}</a></h3>
                                                <span className='mx-1  pt-[2px] font-semibold cursor-pointer text-gray-500 hover:text-blue-500 ' onClick={() => { coptext(item.site) }}><FaCopy /></span>
                                            </th>
                                            <th className='border border-blue-400 w-[30%]  flex justify-between'>
                                                <h3 className='font-bold pl-2 text-left overflow-auto  ' >{item.username}</h3>
                                                <span className='mx-1 pt-[2px]  font-semibold  cursor-pointer text-gray-500 hover:text-blue-500' onClick={() => { coptext(item.username) }}><FaCopy /></span>
                                            </th>
                                            <th className='border border-blue-400 w-[30%]  flex justify-between'>
                                                <h3 className='font-bold pl-2 text-left overflow-auto  ' >{hidepassword(item.password)}</h3>
                                                <span className='mx-1 pt-[2px]  font-semibold cursor-pointer text-gray-500 hover:text-blue-500 ' onClick={() => { coptext(item.password) }}><FaCopy /></span>
                                            </th>
                                            <th className='border border-blue-400  w-[10%]  flex gap-2'>
                                                <span className='m-auto cursor-pointer hover:text-gray-800 text-gray-600' onClick={() => { editpassword(item._id) }}><FaEdit /></span>
                                                <span className='m-auto cursor-pointer text-red-500 hover:text-red-700' onClick={() => { deletepassword(item._id) }}><MdDelete /></span>
                                            </th>
                                        </tr>


                                    })}
                                </tbody>
                            </table>
                        </div>}
                </div>

            </div>

            <ToastContainer />
        </>
    )
}

export default Home