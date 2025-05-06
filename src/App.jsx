import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Body from "./components/Body";
import Login from "./components/Login";
import MainLayout from "./components/MainLayout";
import ResumeUpload from "./components/ResumeUpload";

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
        element: <MainLayout />,
        children: [
          { index: true, element: <ResumeUpload />}
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