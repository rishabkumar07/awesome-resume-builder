import { useState, useRef } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
  
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const email = useRef(null);
  const password = useRef(null);
  const displayName = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSignInForm = () => setIsSignInForm(!isSignInForm);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.current.value || !password.current.value) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    try {
      if (isSignInForm) {
        // Sign In logic
        const userCredential = await signInWithEmailAndPassword(
          auth, 
          email.current.value, 
          password.current.value
        );
        const { uid, email: userEmail, displayName, photoURL } = userCredential.user;
        dispatch(addUser({ uid, email: userEmail, displayName, photoURL }));
        navigate("/app");
      } 
      else {
        // Sign Up logic
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          email.current.value, 
          password.current.value
        );
        
        // Update the user profile with display name
        await updateProfile(userCredential.user, { 
          displayName: displayName.current.value 
        });
        
        // Get the updated user data
        const { uid, email: userEmail, photoURL } = userCredential.user;
        
        // Dispatch with the display name from our ref
        dispatch(addUser({ 
          uid, 
          email: userEmail, 
          displayName: displayName.current.value, // Use the value directly
          photoURL 
        }));
        
        navigate("/app");
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
        <div className="relative mb-4">
          <input
            ref={password}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 border rounded pr-10"
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer hover:text-gray-800 transition-colors duration-200"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            )}
          </button>
        </div>
        {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
        <button className="w-full bg-blue-500 text-white p-2 rounded mb-2 cursor-pointer hover:bg-blue-600 transition-colors duration-200" type="submit">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="text-sm text-center">
          {isSignInForm ? "Don't have an account?" : "Already have an account?"}{" "}
          <span className="text-blue-500 cursor-pointer hover:text-blue-700 transition-colors duration-200" onClick={toggleSignInForm}>
            {isSignInForm ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
