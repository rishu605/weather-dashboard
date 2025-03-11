import { useState, useEffect } from "react";
import CitySelector from "./CitySelector";
import WeatherCard from "./WeatherCard";
import ForecastSidebar from "./ForecastSidebar";
import { fetchWeatherData, fetchWeatherForecast } from "../api/api";
import { getStoredCities, saveCities } from "../utils/storage";

const WeatherDashboard = () => {
    const [cities, setCities] = useState<string[]>(getStoredCities());
    const [weatherData, setWeatherData] = useState<Record<string, any>>({});
    const [forecastData, setForecastData] = useState<any | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    useEffect(() => {
        cities.forEach(city => {
            fetchWeatherData(city)
                .then(data => setWeatherData(prev => ({ ...prev, [city]: data })))
                .catch(console.error);
        });
    }, [cities]);

    const addCity = (city: string) => {
        if (!cities.includes(city)) {
            setCities([...cities, city]);
            saveCities([...cities, city]);
        }
    };

    const removeCity = (city: string) => {
        const newCities = cities.filter(c => c !== city);
        setCities(newCities);
        saveCities(newCities);
    };

    const showForecast = (city: string) => {
        setSelectedCity(city);
        fetchWeatherForecast(city)
            .then(data => setForecastData(data))
            .catch(console.error);
    };

    const closeSidebar = () => {
        setSelectedCity(null);
        setForecastData(null);
    };

    return (
        <div className="dashboard">
            <CitySelector onAddCity={addCity} />
            <div className="weather-cards">
                {cities.map(city => weatherData[city] && (
                    <WeatherCard 
                        key={city} 
                        city={city} 
                        data={weatherData[city]} 
                        onRemove={() => removeCity(city)} 
                        onClick={() => showForecast(city)}
                    />
                ))}
            </div>

            {/* Forecast Sidebar */}
            <ForecastSidebar 
                selectedCity={selectedCity} 
                forecastData={forecastData} 
                closeSidebar={closeSidebar} 
            />
        </div>
    );
};

export default WeatherDashboard;