import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Body from "./components/Body";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

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
        path: "/dashboard", 
        element: <Dashboard /> 
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