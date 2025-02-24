
import Lottie from "lottie-react";
import errorAnim from "@/assets/error-animation.json";

const ErrorPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900">
            <div className="text-center p-6 max-w-3xl">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Oops! Something Went Wrong
                </h1>
                <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                    The page you’re looking for doesn’t exist or might have been moved.
                </p>
                <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
                    Please check the URL or try again later.
                </p>

                {/* Lottie Animation for Error */}
                <div className="mt-6">
                    <Lottie animationData={errorAnim} loop={true} className="max-w-xs mx-auto" />
                </div>

                {/* Button to Go Back to Homepage */}
                <button
                    onClick={() => window.location.href = "/"}
                    className="mt-6 px-6 py-3 bg-slate-800 text-white text-lg font-medium rounded-lg shadow hover:bg-slate-900 focus:ring-4 transition"
                    aria-label="Go to homepage"
                >
                    Back Homepage
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
