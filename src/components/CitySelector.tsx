import { useState } from "react";

interface Props {
    onAddCity: (city: string) => void;
    onClick: () => void;
}

const CitySelector: React.FC<Props> = ({ onAddCity, onClick }) => {
    const [city, setCity] = useState("");

    const handleAddCity = () => {
        if (!city.trim()) return; // Prevent empty input
        onAddCity(city.trim());
        setCity("");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onClick()
        setCity(e.target.value);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleAddCity();
        }
    }
        
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