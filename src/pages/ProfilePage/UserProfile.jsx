import { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";

const GEOCODING_API_KEY = import.meta.env.VITE_GEOCODING_API_KEY;
const GEOCODING_API_URL = `https://api.opencagedata.com/geocode/v1/json?key=${GEOCODING_API_KEY}&q=`;

const getLocationString = async (lat, lng) => {
    try {
        const response = await axios.get(`${GEOCODING_API_URL}${lat},${lng}`);
        return response.data.results[0]?.formatted || "Address not found";
    } catch (error) {
        console.error("Error fetching location:", error);
        return "Failed to fetch address";
    }
};

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [locationString, setLocationString] = useState("");

    const auth = getAuth();
    const currentUser = auth.currentUser;

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!currentUser) {
                setError("No user is logged in");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`https://task-management-server-self-iota.vercel.app/users/${currentUser.email}`);
                setUser(response.data.user);

                if (response.data.user.location) {
                    const { lat, lng } = response.data.user.location;
                    setLocationString(await getLocationString(lat, lng));
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
                setError("Failed to fetch profile");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [currentUser]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="lg:w-fit w-[90%] mx-auto mt-10 p-8 bg-background border-2 shadow-lg rounded-lg relative">
            <div className="flex justify-center mb-6">
                <img
                    src={user?.image || "/path/to/default-avatar.jpg"}
                    alt="User Profile"
                    className="w-32 h-32 rounded-full border-4 border-purple-900"
                />
            </div>

            <h2 className="lg:text-3xl text-xl font-semibold text-purple-600 mb-4">
                <span>Welcome Back!</span> {user?.name || "No Name Provided"}
            </h2>

            <div className="text-center mb-4">
                <p className="text-lg text-gray-700 text-start">
                    <span className="text-purple-600">Your Email :</span> {user?.email || "No Email Provided"}
                </p>
                <p className="text-lg text-start text-gray-700">
                    <span className="text-purple-600">Location :</span> {locationString || "No Location Provided"}
                </p>
            </div>

            <div className="bg-purple-500 p-4 text-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">About Me</h3>
                <p className="font-semibold">{user?.description || "No Description Available"}</p>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
                
                <Link to="/" className="bg-background border-2 hover:border-blue-700 px-4 py-2 rounded-lg shadow-md" > 
                 Back
                </Link>
                
                <Link className="bg-background border-2  hover:border-blue-700 px-4 py-2 rounded-lg shadow-md" to="/settings">Update Profile</Link>
            </div>
        </div>
    );
};

export default Profile;
