import React from "react";

interface AddCityErrorProps {
    error: string | null;
}

const AddCityError: React.FC<AddCityErrorProps> = ({ error }) => {
    if (!error) return null; // Prevent rendering if no error exists

    return <p className="error-message">{error}</p>;
};

export default AddCityError;
