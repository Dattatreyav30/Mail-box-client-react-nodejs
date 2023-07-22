import { ToastContainer } from "react-toastify";
import SignUp from "./components/User/SignUp/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/User/Login/Login";
import Profile from "./components/User/Profile/Profile";
import ComposeEmail from "./components/Mail/ComposeEmail/ComposeEmail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path:'/open-mail',
    element : <ComposeEmail/>
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
