import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import { imageUpload } from "@/api/Utils";
import { Helmet } from "react-helmet-async";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from "@/shared/LoaderSpinner";
import Lottie from "lottie-react";
import register from "@/assets/login-anime.json";

const Register = () => {
    const { createUser, user, updateUser, googleSignIn, setUser, loading, setLoading } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

    if (user) return <Navigate to={"/"} replace={true} />;

    // Function to save user in the database using Axios
    const saveUser = async (userData) => {
        try {
            const response = await axios.post("http://localhost:5000/users", userData);
            return response.data;
        } catch (error) {
            console.error("Error saving user:", error);
            throw error; // Re-throw for handling in calling function
        }
    };

    // Handle User Registration
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const image = form.image.files[0];

        const passwordRegex = /^(?=.{6,})(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/;

        if (!passwordRegex.test(password)) {
            return toast.error("Password must be 6+ characters, with an uppercase letter, a number, and a special character.");
        }

        setLoading(true);

        try {
            // Upload Image First
            const imageURL = await imageUpload(image);

            // Create User in Firebase
            const result = await createUser(email, password);
            await updateUser(name, imageURL);

            // Save user in state
            const newUser = { email, name, image: imageURL };
            setUser(newUser);

            // Save user in DB using Axios
            await saveUser(newUser);

            toast.success("Signup Successful");
            navigate("/");
        } catch (err) {
            console.error(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle Google Sign-in
    const handleGoogleSignIn = async () => {
        try {
            const data = await googleSignIn();
            const { email, displayName, photoURL } = data.user;

            // Save user in database using Axios
            await saveUser({ email, name: displayName, image: photoURL });

            navigate("/");
            toast.success("Signup Successful");
        } catch (err) {
            console.error(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading)
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader />
            </div>
        );

    return (
        <div className="my-10 flex items-center justify-center">
            <Helmet>
                <title>Register || News 240</title>
            </Helmet>
            <div className="max-w-4xl w-[90%] bg-background border-2 shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
                {/* Left Section: Animation */}
                <div className="md:w-1/2 p-2 flex items-center justify-center">
                    <Lottie animationData={register} loop />
                </div>

                {/* Right Section: Form */}
                <div className="md:w-1/2 p-8 border-2 m-1 rounded-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
                            <input type="text" id="name" name="name" required placeholder="Enter your name"
                                className="mt-1 block w-full border text-cyan-600 border-gray-300 bg-white rounded-md p-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                            <input type="email" id="email" name="email" required placeholder="Type here"
                                className="mt-1 block w-full border text-cyan-600 border-gray-300 bg-white rounded-md p-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                        </div>

                        <div className="mb-4 relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                            <input type={showPassword ? "text" : "password"} id="password" name="password" required placeholder="Enter your password"
                                className="mt-1 block w-full border border-gray-300 text-cyan-600 bg-white rounded-md p-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-600">Photo Upload</label>
                            <input type="file" id="photoUrl" name="image" required
                                className="mt-1 block w-full border border-gray-300 text-cyan-600 bg-white rounded-md p-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                        </div>

                        <button type="submit"
                            className="w-full hover:scale-[1.02] bg-slate-800 hover:bg-slate-900 text-white font-medium py-2.5 rounded-md transition duration-300 ease-out active:scale-[0.98]">
                            Register
                        </button>
                    </form>

                    <p className="mt-4 text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-slate-900 font-medium hover:underline">Login here</Link>
                    </p>

                    <div className="divider">OR</div>

                    <div className="flex justify-center gap-4 mt-2">
                        <button onClick={handleGoogleSignIn}
                            className="bg-white text-gray-800 border border-gray-300 px-3 py-2 rounded-lg w-full flex items-center justify-center gap-3 hover:bg-gray-100">
                            <FaGoogle size={20} className="text-red-500" />
                            <span className="font-medium">Login with Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
