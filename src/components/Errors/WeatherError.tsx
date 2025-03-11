interface WeatherErrorProps {
    city: string; // Name of the city
    error: string; // Error message to display
}

/**
 * WeatherError Component
 * Displays an error message when weather data for a city cannot be retrieved.
 */
const WeatherError: React.FC<WeatherErrorProps> = ({ city, error }) => {
    return (
        <div className="weather-error">
            <h3>{city}</h3>
            <p className="error-message">{error}</p>
        </div>
    );
};

export default WeatherError;
