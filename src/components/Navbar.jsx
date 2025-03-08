import React, { useRef } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { logout } = useAuthStore()
  const pageref = useRef(true)
  const User = useAuthStore((state) => state.authUser)
  const navigate = useNavigate()

  const logoutAlert = async () => {
    const logoutt = confirm("do yo want to Logout")
    if (logoutt) {
      await logout()
      navigate("/login")
    }
  };

  const Trashpage = () => {
    if (pageref.current)
      navigate("/trash", { replace: true })
    else
      navigate("/", { replace: true })
    pageref.current = !pageref.current

  }
  return (
    <nav className='flex justify-between bg-gray-100 text-black'>
      <div className='ml-5' >LOGIN MANAGER</div>
      <div className='flex gap-5 list-none'>
        <li className="text-black hover:font-medium hover:text-gray-500">
          {pageref.current ? <Link href="trash" onClick={Trashpage}>Trash</Link> :
            <Link href="trash" onClick={Trashpage}>Home</Link>}</li>
        <li className='text-black hover:font-medium hover:text-gray-500 cursor-pointer'>About</li>
        <li className='mr-5 '>
          {User && <Link href="/logout" className='text-black hover:font-medium hover:text-gray-500' onClick={logoutAlert}>Logout</Link>}
        </li>
      </div>
    </nav >
  )
}

export default Navbar