import React from "react";

interface AddCityErrorProps {
    error: string | null; // Error message to display
}

/**
 * AddCityError Component
 * Displays an error message when adding a city fails.
 */
const AddCityError: React.FC<AddCityErrorProps> = ({ error }) => {
    if (!error) return null; // Do not render if there's no error

    return <p className="error-message">{error}</p>;
};

export default AddCityError;
