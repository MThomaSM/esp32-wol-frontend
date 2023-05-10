import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/Error";
import {tokenLoader} from "./util/auth";
import RootLayout from "./pages/Root";
import Home, {homeLoader} from "./pages/Home";
import EditDevice from "./pages/Devices/EditDevice";
import DeleteDevice from "./pages/Devices/DeleteDevice";
import EditComputer from "./pages/Computers/EditComputer";
import DeleteComputer from "./pages/Computers/DeleteComputer";
import Startlist, {startlistLoader} from "./pages/Startlist";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import UpdatePassword from "./pages/Auth/UpdatePassword";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    errorElement: <ErrorPage/>,
    element: <RootLayout/>,
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <Home/>,
        id: 'homepage',
        loader: homeLoader,
      },
      {
        path: "auth",
        children: [
          {
            path: "login",
            element: <Login/>
          },
          {
            path: "signup",
            element: <Signup/>
          },
          {
            path: "updatePassword",
            element: <UpdatePassword/>
          }
        ]
      },
      {
        path: "devices",
        children: [
          {
            path: "edit",
            children: [
              {
                path: ":deviceId",
                element: <EditDevice/>
              }
            ]
          },
          {
            path: "delete",
            children: [
              {
                path: ":deviceId",
                element: <DeleteDevice/>
              }
            ]
          },
        ],
      },
      {
        path: "computers",
        children: [
          {
            path: "edit",
            children: [
              {
                path: ":computerId",
                element: <EditComputer/>
              }
            ]
          },
          {
            path: "delete",
            children: [
              {
                path: ":computerId",
                element: <DeleteComputer/>
              }
            ]
          },
        ],
      },
      {
        path: "startlist/:deviceUuid",
        element: <Startlist/>,
        loader: startlistLoader
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
