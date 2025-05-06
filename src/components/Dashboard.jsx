import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Navigate } from  "react-router-dom";
  
  const DashBoard = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleLogout = async () => {
      await signOut(auth);
      dispatch(removeUser());
      navigate("/");
    };
  
    if (!user) {
      return <Navigate to="/" replace />;
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.displayName || user.email}!</h1>
        <p className="text-gray-600">This is your dashboard.</p>
        <button className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer mt-4" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  };
  
export default DashBoard;