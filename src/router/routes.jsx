import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layout/Mainlayout";
import ErrorPage from "@/pages/ErrorPage/errorpage";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Profile from "@/pages/ProfilePage/UserProfile";
import Settings from "@/pages/ProfilePage/Settings";





const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/register',
                element: <Register/>,
            },
            {
                path: '/profile',
                element: <PrivateRoute><Profile /></PrivateRoute>,
            },
            {
                path: '/settings',
                element: <PrivateRoute><Settings/></PrivateRoute>,
            },

             
           

        ]
    },
   

]);

export default router