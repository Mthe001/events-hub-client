import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "@/hooks/useAuth"; // Assuming you have a custom hook for authentication
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


// Custom component to capture click events on the map
const LocationPicker = ({ setLocation }) => {
    useMapEvents({
        click(event) {
            const { lat, lng } = event.latlng;
            setLocation({ lat, lng }); // Store the latitude and longitude as an object
        },
    });

    return null;
};

const Settings = () => {
    const { user } = useAuth();  // Assuming you have the user data
    const [name, setName] = useState(user?.displayName || "");
    const [location, setLocation] = useState(user?.location || { lat: 51.505, lng: -0.09 }); // Default lat/lng
    const [description, setDescription] = useState(user?.description || "");
    const [image, setImage] = useState(user?.photoURL || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            imageUpload(file).then((url) => setImage(url));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updatedUser = {
                email: user.email,
                name,
                location, // Send the lat/lng object as location
                description,
                image,
            };
            // Make PUT request to update user info
            const response = await axios.put("https://task-management-server-self-iota.vercel.app/users", updatedUser);
            console.log("User updated:", response.data);

            // Show success toast
            toast.success("Profile updated successfully!");
        } catch (err) {
            setError("Failed to update profile");
            console.log(err);

            // Show error toast
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Image upload function
    const imageUpload = async (imageData) => {
        const formData = new FormData();
        formData.append("file", imageData);
        formData.append("upload_preset", "your_cloudinary_preset");

        const { data } = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
            formData
        );
        return data.secure_url;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background py-8">
            <div className="bg-background border-2 p-8 rounded-lg shadow-lg  w-[90%] lg:max-w-md">
                <Link to="/profile" className="border-2 px-4 py-1 rounded-md">Back</Link>
                <h2 className="text-3xl text-purple-700 font-semibold text-center mb-6">Update Profile</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    {/* Profile Picture */}
                    <div className="mb-6 flex flex-col justify-center">
                        <label className="block text-lg">Profile Image</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="mt-2 w-full max-w-[200px] text-sm text-gray-600 mx-1 "
                        />
                        {image && <img src={image} alt="Profile" className="mt-4 w-24 h-24 rounded-full" />}
                    </div>

                    {/* Full Name */}
                    <div className="mb-4">
                        <label className="block text-lg font-medium">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mt-2 p-2 border bg-inherit border-gray-300 rounded-md "
                        />
                    </div>

                    {/* Location */}
                    <div className="mb-4">
                        <label className="block text-lg font-medium">Location</label>
                        {/* Map to pick location */}
                        <MapContainer
                            center={[51.505, -0.09]} // Default map center
                            zoom={13}
                            style={{
                                height: '200px',
                                width: '100%',
                                marginTop: '60px',
                            }}
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <LocationPicker setLocation={setLocation} />
                            {location && (
                                <Marker position={location}>
                                    <Popup>Your selected location</Popup>
                                </Marker>
                            )}
                        </MapContainer>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <label className="block text-lg font-medium">Description</label>
                        <textarea
                            value={description}
                            placeholder="Write something about yourself"
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full mt-2 p-2 border border-gray-300 rounded-lg bg-inherit"
                            rows="4"
                        />
                    </div>

                    {/* Submit */}
                    <div className="mb-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-purple-700 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                        >
                            {loading ? "Updating..." : "Update Profile"}
                        </button>
                    </div>
                </form>
            </div>

           
        </div>
    );
};

export default Settings;
