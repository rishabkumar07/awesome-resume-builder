import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500 text-white p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-lg p-8 shadow-2xl">
        <h1 className="text-6xl font-bold mb-2">Oops!</h1>
        <h2 className="text-3xl font-semibold mb-6">You've wandered into the void</h2>
        
        <div className="mb-8 relative">
          <div className="text-9xl absolute -top-10 right-0 opacity-20">👽</div>
          <p className="text-xl mb-4">
            This cosmic sector doesn't exist in our universe.
          </p>
          <p className="text-lg opacity-80">
            {error?.statusText || error?.message || "Unknown anomaly detected"}
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            to="/"
            className="block w-full bg-white text-purple-600 font-bold py-3 px-4 rounded-lg text-center hover:bg-purple-100 transition-all duration-300"
          >
            Beam me back to safety
          </Link>
          
          <p className="text-center text-sm opacity-70 mt-4">
            "Not all those who wander are lost, but you definitely are."
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;