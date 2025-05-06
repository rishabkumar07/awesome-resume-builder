import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Body from "./components/Body";
import Login from "./components/Login";
import DashboardLayout from "./components/DashboardLayout";
import ResumeUpload from "./components/ResumeUpload";
import { Navigate } from "react-router-dom";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      { 
        path: "/", 
        element: <Login /> 
      },
      {
        path: "/app",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Navigate to="upload" replace /> },  // default to /app/upload
          { path: "upload", element: <ResumeUpload /> },
        ]
      }
    ]
  }
]);

const App = () => {
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
};

export default App;