import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layout/Mainlayout";
import ErrorPage from "@/pages/ErrorPage/errorpage";
import Home from "@/pages/Home/Home";




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
           
             
           

        ]
    },
   

]);

export default router