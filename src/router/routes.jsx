import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layout/Mainlayout";
import ErrorPage from "@/pages/ErrorPage/errorpage";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";




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
             
           

        ]
    },
   

]);

export default router