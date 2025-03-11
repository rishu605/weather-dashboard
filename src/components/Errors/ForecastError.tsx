interface ForecastErrorProps {
    error: string;
    closeError: () => void;
}

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
