import Login from "./Login"; 
import DashBoard from "./DashBoard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./store";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/dashboard",
      element: <DashBoard />
    }
  ]);
  return (
  	<div>
      <Provider store={appStore}>
        <RouterProvider router={appRouter}/>
      </Provider>
    </div>
  )
}

export default App;