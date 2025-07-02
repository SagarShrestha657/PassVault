import React, { useRef, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { axiosInstance } from '../lib/axios';
import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '../components/ui/dialog';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const Navbar = () => {
  const { logout } = useAuthStore()
  const pageref = useRef(true)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const Logout = async () => {
    NProgress.start()
    await logout()
    NProgress.done()
    navigate("/login")
  };

  const Trashpage = () => {
    pageref.current = !pageref.current
  }

  const downloadFile = async (type) => {
    try {
      NProgress.start()
      const response = await axiosInstance.get(`/export/${type}`, {
        responseType: "blob",
        withCredentials: true,
      });
      const contentDisposition = response.headers["content-disposition"];
      const fileName = contentDisposition
        ? contentDisposition.split("filename=")[1].replace(/"/g, "")
        : `logins.${type}`;
      const mimeType =
        type === "csv"
          ? "text/csv"
          : type === "pdf"
            ? "application/pdf"
            : "application/json";
      const blob = new Blob([response.data], { type: mimeType });
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download error:", error);
    }
    finally {
      NProgress.done()
    }
  };

  // Menu items as a component for reuse
  const MenuItems = () => (
    <>
      <li className="hover:text-blue-500">
        <Link to="/resetpassword" onClick={() => setMenuOpen(false)}>Reset Password</Link>
      </li>
      <li className="hover:text-blue-500">
        {pageref.current ? (
          <Link to="/trash" onClick={() => { Trashpage(); setMenuOpen(false); }}>Trash</Link>
        ) : (
          <Link to="/" onClick={() => { Trashpage(); setMenuOpen(false); }}>Home</Link>
        )}
      </li>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <li className="hover:text-blue-500 cursor-pointer">Export</li>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem onClick={() => { downloadFile("pdf"); setMenuOpen(false); }}>Export as PDF</DropdownMenuItem>
          <DropdownMenuItem onClick={() => { downloadFile("json"); setMenuOpen(false); }}>Export as JSON</DropdownMenuItem>
          <DropdownMenuItem onClick={() => { downloadFile("csv"); setMenuOpen(false); }}>Export as CSV</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog>
        <DialogTrigger asChild>
          <li className="cursor-pointer hover:text-blue-500">Logout</li>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Logout PassVault</DialogTitle>
            <DialogDescription className="text-center p-5">Do you want to Logout?</DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <div className="flex justify-between w-full">
                <Button type="button" variant="secondary">Cancel</Button>
                <Button type="button" variant="secondary" onClick={Logout}>Yes</Button>
              </div>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );

  return (
    <nav className="flex items-center justify-between bg-white shadow-md rounded-b-lg px-4 py-2 sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="PassVault Logo" className="h-9 w-9 rounded-full shadow" />
        <span className="text-lg sm:text-2xl font-bold text-blue-700 tracking-tight">PassVault</span>
      </div>
      {/* Desktop Menu */}
      <ul className="hidden sm:flex items-center gap-2 sm:gap-6 list-none text-base font-medium">
        <MenuItems />
      </ul>
      {/* Mobile Hamburger */}
      <div className="sm:hidden flex items-center">
        <button
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Open menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="absolute top-16 right-4 w-48 bg-white rounded-lg shadow-lg border border-gray-200 animate-fade-in z-50">
            <ul className="flex flex-col gap-2 p-4 text-base font-medium">
              <MenuItems />
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar