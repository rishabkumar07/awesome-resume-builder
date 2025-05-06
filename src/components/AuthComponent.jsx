import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const AuthComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        //user is signed In
        const { uid, email, displayName, photoURL, isAnonymous } = user;
        dispatch(addUser({ uid, email, displayName, photoURL, isAnonymous }));
        //auth passed redirect to browse page
        navigate("/app");
      }
      else {
        //user is signed out
        dispatch(removeUser());
        //auth failed redirect to login page
        navigate("/");
      }
    });
    
    return () => unsubscribe();
  }, []);

  return (
    <div>
    </div>
  )
};

export default AuthComponent;