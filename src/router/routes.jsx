import MainLayout from "@/layout/Mainlayout";
import ErrorPage from "@/pages/ErrorPage/errorpage";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";

import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AddTask from "@/components/addTask/AddTask";
import Register from "@/pages/Register/Register";
import Profile from "@/pages/ProfilePage/UserProfile";
import Settings from "@/pages/ProfilePage/Settings";
import ManageTask from "@/components/manageTask/ManageTask";
import EditTask from "@/components/manageTask/EditTask";
import App from "@/App";



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
                path: "/login",
                element: <Login></Login>
            },
            {
                path:'/register',
                element:<Register/>,
            },
            {
                path:'/profile',
                element:<PrivateRoute><Profile/></PrivateRoute>,
            },
            {
                path:'/settings',
                element:<PrivateRoute><Settings/></PrivateRoute>,
            },
            {
                path:'/add-task',
                element:<PrivateRoute><AddTask/></PrivateRoute>,
            },
            {
                path:'/tasks/:email',
                element:<PrivateRoute><App/></PrivateRoute>,
            },
            {
                path:'/tasks/edit/:id',
                element:<PrivateRoute><EditTask/></PrivateRoute>
            },
            {
                path:'/manage-task',
                element:<PrivateRoute><ManageTask/></PrivateRoute>,
            }
             
           

        ]
    },
   

]);

export default router