interface ForecastErrorProps {
    error: string; // Error message to display
    closeError: () => void; // Function to close the error message
}

/**
 * ForecastError Component
 * Displays an error message for forecast-related issues.
 */
const ForecastError: React.FC<ForecastErrorProps> = ({ error, closeError }) => {
    return (
        <div className="forecast-error">
            <div className="error-message">
                <p>{error}</p>
                <button className="close-btn" onClick={closeError}>×</button>
            </div>
        </div>
    );
};

export default ForecastError;
