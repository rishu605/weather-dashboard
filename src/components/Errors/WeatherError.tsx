interface WeatherErrorProps {
    city: string;
    error: string;
}

const WeatherError: React.FC<WeatherErrorProps> = ({ city, error }) => {
    return (
        <div className="weather-error">
            <h3>{city}</h3>
            <p className="error-message">{error}</p>
        </div>
    );
};

export default WeatherError;
