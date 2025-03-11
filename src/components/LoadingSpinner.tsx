import React from "react";

/**
 * A simple loading spinner component.
 * Displays a spinning animation with a "Loading..." message.
 */
const LoadingSpinner: React.FC = () => {
    return (
        <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    );
};

export default LoadingSpinner;
