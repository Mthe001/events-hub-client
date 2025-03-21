import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";
import { TextAnimate } from "@/components/magicui/text-animate";
import { AuthContext } from "@/Provider/AuthProvider";
import { CalendarPlus } from "lucide-react"; // Icon for adding events
import { CalendarCheck } from "lucide-react"; // Icon for managing events
import { BsCardChecklist } from "react-icons/bs";

// Updated sections for Local Events Hub
const sections = [
    { name: "Home", id: "home", path: "/" },
    {
        name: "Add Event",
        id: "add_event",
        path: "/add-event",
        icon: <CalendarPlus className="w-5 h-5 mr-1" />,
    },
    {
        name: "All Events",
        id: "all_events",
        path: "/all-events",
        icon: <BsCardChecklist className="w-5 h-5 mr-1" />,
    },
    {
        name: "My Events",
        id: "my_events",
        path: "/my-events",
        icon: <CalendarCheck className="w-5 h-5 mr-1" />,
    },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
    const { user, logOut } = useContext(AuthContext);
    const [navbarWidth, setNavbarWidth] = useState("60%");

    useEffect(() => {
        const handleScroll = () => {
            // Set navbar width to 70% when the user scrolls, else set it to 60%
            if (window.scrollY > 50) {
                setNavbarWidth("85%");
            } else {
                setNavbarWidth("80%");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const sidebarVariants = {
        hidden: { x: "100%" },
        visible: { x: 0 },
    };

    // Handle logout
    const handleLogout = () => {
        logOut()
            .then(() => {
                // Redirect to login page after logout
                window.location.href = "/login";
            })
            .catch((error) => {
                console.error("Error logging out: ", error);
            });
    };

    return (
        <motion.nav
            className="top-0 left-0 mx-auto bg-background py-4 z-50 shadow-md border-2 border-gray-500 border-t-0 rounded-xl border-r-0 border-l-0"
            style={{ width: navbarWidth }} // Set dynamic width based on scroll
            initial={{ width: "60%" }} // Initial width
            animate={{ width: navbarWidth }} // Animated width
            transition={{ duration: 0.3 }} // Smooth animation for width change
        >
            <div className="container mx-auto flex justify-between items-center px-6">
                {/* Logo */}
                <NavLink to="/">
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <div className="text-primary text-2xl font-bold">
                            <TextAnimate animation="slideUp" by="character">
                                Events Hub
                            </TextAnimate>
                        </div>
                    </div>
                </NavLink>

                {/* Hamburger Menu */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-foreground focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-6">
                    {sections.map((section) => (
                        <NavLink
                            key={section.id}
                            to={section.path}
                            className={({ isActive }) =>
                                `cursor-pointer text-md font-semibold flex items-center transition-colors duration-300 ${isActive ? "text-primary border-b-2 border-primary" : "text-foreground"}`
                            }
                        >
                            {section.icon} {/* Render the icon */}
                            {section.name}
                        </NavLink>
                    ))}
                </div>

                {/* Dark Mode Toggle & User Profile / Login/Register Icons */}
                <div className="hidden md:flex items-center space-x-4">
                    <ModeToggle />

                    <div className="flex space-x-4">
                        {user ? (
                            <div>
                                {/* User Profile Picture */}
                                <img
                                    src={user.photoURL || "/path/to/default-avatar.jpg"}
                                    alt="User"
                                    className="w-8 h-8 rounded-full cursor-pointer"
                                    onClick={toggleDropdown}
                                />

                                {/* Modal for User Menu */}
                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 1 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 1 }}
                                            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                                            onClick={toggleDropdown} // Close modal on background click
                                        >
                                            <div
                                                className="bg-background fixed right-[10%] top-[8%] border-2 rounded-lg p-6 shadow-lg w-44"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <p className="text-lg font-semibold">{user.displayName || "User Menu"}</p>
                                                <NavLink
                                                    to="/profile"
                                                    className="block text-gray-800 hover:text-primary py-2 px-4 rounded"
                                                >
                                                    Profile
                                                </NavLink>
                                                <NavLink
                                                    to="/settings"
                                                    className="block text-gray-800 hover:text-primary py-2 px-4 rounded"
                                                >
                                                    Settings
                                                </NavLink>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left text-gray-800 hover:text-primary py-2 px-4 rounded"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <>
                                {/* Login Icon */}
                                <NavLink to="/login" className="text-foreground hover:text-primary transition">
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 3H6a2 2 0 00-2 2v14a2 2 0 002 2h4m3-10l4 4m0 0l-4 4m4-4H7"
                                        ></path>
                                    </svg>
                                    Login
                                </NavLink>

                                {/* Register Icon */}
                                <NavLink to="/register" className="text-foreground hover:text-primary transition">
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 12v4m0 0v4m0-8h4m-4 0H8m4-4a7 7 0 11-7 7 7 7 0 017-7z"
                                        ></path>
                                    </svg>
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Sidebar for Mobile */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={sidebarVariants}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-full w-64 bg-background shadow-lg z-50"
                    >
                        <div className="flex justify-end p-4">
                            <button onClick={toggleMenu} className="text-foreground focus:outline-none">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-col space-y-4 p-4">
                            {sections.map((section) => (
                                <NavLink
                                    key={section.id}
                                    to={section.path}
                                    className={({ isActive }) =>
                                        `cursor-pointer text-lg font-medium transition-colors duration-300 ${isActive ? "text-primary border-b-2 border-primary" : "text-foreground"}`
                                    }
                                    onClick={() => toggleMenu()}
                                >
                                    {section.icon} {/* Render the icon */}
                                    {section.name}
                                </NavLink>
                            ))}
                            <div className="flex items-center space-x-4">
                                <ModeToggle />
                                {user ? (
                                    <>
                                        {/* Profile Picture for Mobile */}
                                        <img
                                            src={user.photoURL || "/path/to/default-avatar.jpg"}
                                            alt="User"
                                            className="w-8 h-8 rounded-full cursor-pointer"
                                            onClick={toggleDropdown}
                                        />
                                        <button onClick={handleLogout} className="text-foreground hover:text-primary">
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <NavLink to="/login" className="text-foreground hover:text-primary">
                                            Login
                                        </NavLink>
                                        <NavLink to="/register" className="text-foreground hover:text-primary">
                                            Register
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;












