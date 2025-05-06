import { useState, useRef } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
  
  const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const email = useRef(null);
    const password = useRef(null);
    const displayName = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleSignInForm = () => setIsSignInForm(!isSignInForm);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!email.current.value || !password.current.value) {
        setErrorMessage("Please enter both email and password.");
        return;
      }

      try {
        if (isSignInForm) {
          const userCredential = await signInWithEmailAndPassword(auth, email.current.value, password.current.value);
          const { uid, email: userEmail, displayName, photoURL } = userCredential.user;
          dispatch(addUser({ uid, email: userEmail, displayName, photoURL }));
          navigate("/dashboard");
        } 
        else {
        const userCredential = await createUserWithEmailAndPassword(auth, email.current.value, password.current.value);
        const user = userCredential.user;
        await updateProfile(user, { 
          displayName: displayName.current.value 
        });
        await auth.currentUser.reload();
        const { uid, email: userEmail, displayName, photoURL } = auth.currentUser;
        dispatch(addUser({ uid, email: userEmail, displayName, photoURL }));
        navigate("/dashboard");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">{isSignInForm ? "Sign In" : "Sign Up"}</h2>
          {!isSignInForm && (
            <input
              ref={displayName}
              type="text"
              placeholder="Full Name"
              className="w-full mb-2 p-2 border rounded"
              required
            />
          )}
          <input
           ref={email}
            type="email"
            placeholder="Email"
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border rounded"
            required
          />
            {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
          <button className="w-full bg-blue-500 text-white p-2 rounded mb-2 cursor-pointer" type="submit">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="text-sm text-center">
            {isSignInForm ? "Don't have an account?" : "Already have an account?"}{" "}
          <span className="text-blue-500 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;