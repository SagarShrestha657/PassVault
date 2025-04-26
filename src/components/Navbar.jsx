import React, { useRef } from 'react'
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
        responseType: "blob", // Get response as a Blob
        withCredentials: true, // Include cookies for authentication
      });

      // Extract filename from Content-Disposition header
      const contentDisposition = response.headers["content-disposition"];
      const fileName = contentDisposition
        ? contentDisposition.split("filename=")[1].replace(/"/g, "") // Remove quotes
        : `logins.${type}`; // Fallback file name

      // Determine MIME type based on file type
      const mimeType =
        type === "csv"
          ? "text/csv"
          : type === "pdf"
            ? "application/pdf"
            : "application/json"; // Default to JSON


      // Create a Blob with the correct MIME type
      const blob = new Blob([response.data], { type: mimeType });
      const blobUrl = window.URL.createObjectURL(blob);

      // Create and trigger a download link
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Cleanup
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download error:", error);
    }
    finally {
      NProgress.done()
    }
  };

  return (
    <nav className="flex flex-wrap justify-between items-center bg-gray-100 text-gray-600 px-2 py-2">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="PassVault Logo" className="h-8 rounded-full" />
        <span className="text-base sm:text-xl font-semibold text-gray-700">PassVault</span>
      </div>

      <ul className="flex flex-wrap items-center gap-2 sm:gap-5 list-none text-sm sm:text-base">
        <li className="hover:text-blue-500">
          <Link to="/resetpassword">Reset Password</Link>
        </li>
        <li className="hover:text-blue-500">
          {pageref.current ? (
            <Link to="/trash" onClick={Trashpage}>Trash</Link>
          ) : (
            <Link to="/" onClick={Trashpage}>Home</Link>
          )}
        </li>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <li className="hover:text-blue-500 cursor-pointer">Export</li>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem onClick={() => downloadFile("pdf")}>Export as PDF</DropdownMenuItem>
            <DropdownMenuItem onClick={() => downloadFile("json")}>Export as JSON</DropdownMenuItem>
            <DropdownMenuItem onClick={() => downloadFile("csv")}>Export as CSV</DropdownMenuItem>
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
      </ul>
    </nav>

  )
}

export default Navbar