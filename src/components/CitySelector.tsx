import { useState } from "react";

interface Props {
    onAddCity: (city: string) => void; // Function to add a city
    onClick: () => void; // Function to handle input click (e.g., clear errors)
}

/**
 * CitySelector Component
 * Allows users to input and add a city.
 */
const CitySelector: React.FC<Props> = ({ onAddCity, onClick }) => {
    const [city, setCity] = useState("");

    // Adds city if input is not empty
    const handleAddCity = () => {
        if (!city.trim()) return;
        onAddCity(city.trim());
        setCity("");
    };

    // Handles input change and triggers onClick (useful for clearing errors)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onClick();
        setCity(e.target.value);
    };

    // Adds city on pressing Enter
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleAddCity();
    };

    return (
        <div className="city-selector">
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleAddCity}>Add City</button>
        </div>
    );
};

export default CitySelector;
