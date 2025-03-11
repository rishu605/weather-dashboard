import { capitalizeCityName, getWeatherIcon } from "../utils/utils";
import ForecastError from "./Errors/ForecastError";

interface ForecastSidebarProps {
    selectedCity: string | null;
    forecastData: any | null;
    forecastError: any | null;
    closeSidebar: () => void;
}

const ForecastSidebar: React.FC<ForecastSidebarProps> = ({ selectedCity, forecastData, forecastError, closeSidebar }) => {

    if(!selectedCity) return null;

    const renderHeader = () => {
        return (
            <ul className="forecast-header">
                <li>
                    <span>Weather</span>
                    <span>Date</span>
                    <span>Min Temp</span>
                    <span>Max Temp</span>
                    <span>Condition</span>
                </li>
            </ul>
        );
    }

    const renderData = () => {
        return (
            <ul className="forecast-list">
                {forecastData.map((day: any, index: number) => (
                    <li key={index}>
                        <span className="forecast-icon">{getWeatherIcon(day.weather)}</span>
                        <span>{day.date}</span>
                        <span>{day.tempMin}°C</span>
                        <span>{day.tempMax}°C</span>
                        <span>{day.weather}</span>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <>
            <div className={`sidebar ${selectedCity ? "open" : ""}`}>
                <button className="close-btn" onClick={closeSidebar}>×</button>
                <h3>10-Day Forecast for {capitalizeCityName(selectedCity)}</h3>
                {forecastError ? (
                    <ForecastError error={forecastError} closeError={closeSidebar} />
                ) : (
                    <>
                        {forecastData && (
                            <>
                                {renderHeader()}
                                {renderData()}
                            </>
                        )}
                    </>
                )}
            </div>
            <div className="sidebar-overlay" onClick={closeSidebar}></div>
        </>
    );
};

export default ForecastSidebar;