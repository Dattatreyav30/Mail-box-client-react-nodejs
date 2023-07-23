import { ToastContainer } from "react-toastify";
import SignUp from "./components/User/SignUp/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/User/Login/Login";
import Profile from "./components/User/Profile/Profile";
import ComposeEmail from "./components/Mail/ComposeEmail/ComposeEmail";
import EmailSent from "./components/Mail/EmailSent/EmailSent";
import ViewEmail from "./components/Mail/ViewEmail/ViewEmail";
import EmailRecieved from "./components/Mail/EmailRecieved/EmailRecieved";
import ViewInboxEmail from "./components/Mail/ViewInboxEmail/ViewInboxEmail";

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
    path: "/open-mail",
    element: <ComposeEmail />,
  },
  {
    path: "/sent",
    element: (
      <>
        <EmailSent />
      </>
    ),
  },
  {
    path: "/view-email/:id",
    element: <ViewEmail />,
  },
  {
    path: "/recieved-mail",
    element: <EmailRecieved />,
  },
  {
    path: "/view-inbox-email/:id",
    element: <ViewInboxEmail />,
  },
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
