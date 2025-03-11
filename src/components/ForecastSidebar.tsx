import { capitalizeCityName, getWeatherIcon } from "../utils/utils";
import CityMap from "./CityMap";
import ForecastError from "./Errors/ForecastError";

interface ForecastSidebarProps {
    selectedCity: string | null;
    forecastData: any | null;
    forecastError: any | null;
    closeSidebar: () => void;
    lat: number ;
    lon: number;
}

const ForecastSidebar: React.FC<ForecastSidebarProps> = ({ selectedCity, forecastData, forecastError, lat, lon, closeSidebar }) => {

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
                        <div className="map-container">
                            <CityMap lat={lat} lon={lon} city={selectedCity} />
                        </div>
                        {forecastData ? (
                            <>
                                {renderHeader()}
                                {renderData()}
                            </>
                        ) : (
                            <p className="loading-message">Loading forecast...</p> // Placeholder
                        )}

                        {/* ✅ Always keep space for the map to avoid layout shift */}
                    </>
                )}
            </div>
        </>
    );
};

export default ForecastSidebar;