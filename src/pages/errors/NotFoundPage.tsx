import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
            <div className="bg-white shadow-xl rounded-xl p-10 max-w-lg text-center">

                <h1 className="text-8xl font-black text-green-600">
                    404
                </h1>

                <h2 className="text-3xl font-bold mt-6">
                    Page Not Found
                </h2>

                <p className="text-gray-500 mt-4">
                    Sorry, the page you're looking for doesn't exist or has been moved.
                </p>

                <Link
                    to="/"
                    className="inline-block mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
                >
                    Back Home
                </Link>

            </div>
        </div>
    );
};

export default NotFound;