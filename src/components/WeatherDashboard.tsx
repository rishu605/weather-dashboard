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
    const [errors, setErrors] = useState<Record<string, string | null>>({});
    const [forecastError, setForecastError] = useState<string | null>(null);
    useEffect(() => {
        cities.forEach(async (city) => {
            const { data, error } = await fetchWeatherData(city);
            
            if (error) {
                setErrors(prev => ({ ...prev, [city]: error }));
                setWeatherData(prev => ({ ...prev, [city]: null })); // Ensure UI doesn't break
            } else {
                setWeatherData(prev => ({ ...prev, [city]: data }));
                setErrors(prev => ({ ...prev, [city]: null })); // Clear previous errors if successful
            }
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

    const showForecast = async (city: string) => {
        setSelectedCity(city);
        
        const { data, error } = await fetchWeatherForecast(city);
    
        if (error) {
            setForecastData(null);  // Ensure UI doesn't break
            setForecastError(error); // Store the error message
        } else {
            setForecastData(data);
            setForecastError(null); // Clear any previous error
        }
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
                        error={errors[city] || null}
                        onRemove={() => removeCity(city)} 
                        onClick={() => showForecast(city)}
                    />
                ))}
            </div>

            {/* Forecast Sidebar */}
            <ForecastSidebar 
                selectedCity={selectedCity} 
                forecastData={forecastData}
                forecastError={forecastError}
                closeSidebar={closeSidebar} 
            />
        </div>
    );
};

export default WeatherDashboard;