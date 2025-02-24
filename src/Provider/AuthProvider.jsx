import PropTypes from 'prop-types'; // Import PropTypes
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { app } from "@/firebase/firebase_init";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };

    const signin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUser = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser?.email) {
                setUser(currentUser); // Set the user
                setLoading(false); // Stop loading

                // Handle your logic for fetching user-specific data if needed here
                try {
                    // Example for fetching user data from the backend (optional)
                    // const { data } = await axiosPublic.get(`/all-users-user/${currentUser?.email}`);
                } catch (error) {
                    console.log("Error while fetching user data:", error);
                }
            } else {
                setUser(null); // If no user, set user to null
                setLoading(false); // Stop loading
            }
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, []); // Empty dependency array ensures this runs only once after mount

    const authInfo = {
        user,
        loading,
        createUser,
        signin,
        logOut,
        updateUser,
        setUser,
        googleSignIn,
        setLoading,
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

// Add prop types validation
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, // children should be a node and is required
};

export default AuthProvider;
