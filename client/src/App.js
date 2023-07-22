import { ToastContainer } from "react-toastify";
import SignUp from "./components/User/SignUp/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/User/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp/>,
  },
  {
    path : '/login',
    element : <Login/>
  }
]);

const App = () => {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
