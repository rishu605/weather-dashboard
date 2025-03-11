import React from "react";
import { capitalizeCityName, getWeatherIcon } from "../utils/utils";
import WeatherError from "./Errors/WeatherError";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
    city: string;
    data: any;
    error: string | null;
    loading: boolean;
    onRemove: (e: React.MouseEvent) => void;
    onClick: () => void;
}

/**
 * WeatherCard Component
 * - Displays weather data for a city.
 * - Handles loading and error states.
 * - Allows city removal and clicking to view more details.
 */
const WeatherCard: React.FC<Props> = ({ city, data, error, loading, onRemove, onClick }) => {
    const weatherType = data?.weather?.[0]?.main;
    const weatherIcon = getWeatherIcon(weatherType || "");

    return (
        <div className="weather-card" onClick={onClick}>
            <div className="weather-header">
                <h3 className="city">{capitalizeCityName(city)}</h3>
                <span className="weather-icon">{weatherIcon}</span>
            </div>

            <div className="weather-info">
                {loading ? (
                    <LoadingSpinner />
                ) : error ? (
                    <WeatherError city={capitalizeCityName(city)} error={error} />
                ) : (
                    <>
                        <p><strong>Temp:</strong> {data?.main?.temp}°C</p>
                        <p><strong>Humidity:</strong> {data?.main?.humidity}%</p>
                        <p><strong>Wind:</strong> {data?.wind?.speed} km/h</p>
                        <p><strong>Condition:</strong> {weatherType}</p>
                    </>
                )}
            </div>

            <button className="remove-btn" onClick={(e) => { e.stopPropagation(); onRemove(e); }}>
                Remove
            </button>
        </div>
    );
};

export default WeatherCard;
