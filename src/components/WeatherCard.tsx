import React from "react";
import { capitalizeCityName, getWeatherIcon } from "../utils/utils";
import WeatherError from "./Errors/WeatherError";

interface Props {
    city: string;
    data: any;
    error: string | null;
    onRemove: (e: React.MouseEvent) => void;
    onClick: () => void;
}

const WeatherCard: React.FC<Props> = ({ city, data, error, onRemove, onClick }) => {
    const weatherType = data.weather[0].main;
    const weatherIcon = getWeatherIcon(weatherType);

    if (error) {
        return <WeatherError city={capitalizeCityName(city)} error={error} />;
    }

    return (
        <div className="weather-card" onClick={onClick}>
            <div className="weather-header">
                <h3 className="city">{capitalizeCityName(city)}</h3>
                <span className="weather-icon">{weatherIcon}</span>
            </div>

            {
                error ? (
                    <WeatherError city={capitalizeCityName(city)} error={error} />
                ) : (
                    <div className="weather-info">
                        <p><strong>Temp:</strong> {data.main.temp}°C</p>
                        <p><strong>Humidity:</strong> {data.main.humidity}%</p>
                        <p><strong>Wind:</strong> {data.wind.speed} km/h</p>
                        <p><strong>Condition:</strong> {weatherType}</p>
                    </div>
                )
            }

            {/* <div className="weather-info">
                <p><strong>Temp:</strong> {data.main.temp}°C</p>
                <p><strong>Humidity:</strong> {data.main.humidity}%</p>
                <p><strong>Wind:</strong> {data.wind.speed} km/h</p>
                <p><strong>Condition:</strong> {weatherType}</p>
            </div> */}

            <button className="remove-btn" onClick={(e) => { e.stopPropagation(); onRemove(e); }}>
                Remove
            </button>
        </div>
    );
};

export default WeatherCard;