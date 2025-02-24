import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "@/shared/Footer";
import useAuth from "@/hooks/useAuth";
import Loader from "@/shared/LoaderSpinner";
import { ScrollProgress } from "@/components/magicui/scroll-progress";

const MainLayout = () => {
    const { loading } = useAuth()


    if (loading) return <div className="flex items-center justify-center gap-3 h-screen">
        <Loader></Loader> <h1 className="text-4xl">Loading</h1></div>
    return (
        <div>
            <nav className="bg-transparent fixed inset-x-0 z-50">
                <Navbar/>
            </nav>


            <div className=" pt-[87px] min-h-[calc(100vh-336px)]">
                <Outlet></Outlet>
            </div>
            <ScrollProgress/>
           
                <section>
                    <Footer/>
                </section>
           
          
        </div>
    );
};

export default MainLayout;