
import axios from "axios";


// Upload image and return image url 
export const imageUpload = async (imageData) => {

    const formData = new FormData()
    formData.append('file', imageData);
    formData.append('upload_preset', 'mahin_vai_cloudinary');

    const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`, formData)

    return data.secure_url
}


export const saveUser = async (user) => {
    try {
        const response = await axios.post("https://task-management-server-self-iota.vercel.app/users", {
            email: user?.email,      // Email
            name: user?.displayName, // Name
            image: user?.photoURL,   // Image URL
            location: user?.location,  // Location (optional)
            description: user?.description,  // Description (optional)
        });

        console.log(response.data); // Handle success response here
    } catch (error) {
        console.log("Error saving user:", error?.response?.data || error?.message);
    }
};

export const updateUser = async (user) => {
    try {
        const response = await axios.put("https://task-management-server-self-iota.vercel.app/users", {
            email: user?.email,      // Email
            name: user?.displayName, // Name
            image: user?.photoURL,   // Image URL
            location: user?.location,  // Location (optional)
            description: user?.description,  // Description (optional)
        });

        console.log(response.data); // Handle success response here
    } catch (error) {
        console.log("Error updating user:", error?.response?.data || error?.message);
    }
};
