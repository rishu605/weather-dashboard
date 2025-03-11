import React from "react";
import { capitalizeCityName, getWeatherIcon } from "../utils/utils";

interface Props {
    city: string;
    data: any;
    onRemove: (e: React.MouseEvent) => void;
    onClick: () => void;
}

const WeatherCard: React.FC<Props> = ({ city, data, onRemove, onClick }) => {
    const weatherType = data.weather[0].main;
    const weatherIcon = getWeatherIcon(weatherType);

    return (
        <div className="weather-card" onClick={onClick}>
            <div className="weather-header">
                <h3 className="city">{capitalizeCityName(city)}</h3>
                <span className="weather-icon">{weatherIcon}</span>
            </div>

            <div className="weather-info">
                <p><strong>Temp:</strong> {data.main.temp}°C</p>
                <p><strong>Humidity:</strong> {data.main.humidity}%</p>
                <p><strong>Wind:</strong> {data.wind.speed} km/h</p>
                <p><strong>Condition:</strong> {weatherType}</p>
            </div>

            <button className="remove-btn" onClick={(e) => { e.stopPropagation(); onRemove(e); }}>
                Remove
            </button>
        </div>
    );
};

export default WeatherCard;