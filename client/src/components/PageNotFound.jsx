import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const PageNotFound = () => {

    const location = useLocation(); 

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <code>{location?.pathname}</code>
            <h1 className="text-9xl font-bold mb-4">404</h1>
            <h2 className="text-4xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-lg mb-6">😢 Oops! Sorry, the page you are looking for does not exist.</p>
            <NavLink to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                Go to Homepage
            </NavLink>
        </div>
    );
};

export default PageNotFound;