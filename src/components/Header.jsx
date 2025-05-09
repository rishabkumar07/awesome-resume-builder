import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(removeUser());
    navigate("/");
  };

  // Get display name or fallback to email username
  const getDisplayName = () => {
    if (user.displayName) 
      return user.displayName;
    if (user.email)
      return user.email.split('@')[0];
    
    return "User";
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Resume Builder</h1>
        </div>
        <div className="flex-1 text-center">
          <span>Welcome, {getDisplayName()}</span>
        </div>
        <div className="flex-1 flex justify-end">
          <button 
            className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600 transition-colors duration-200" 
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
