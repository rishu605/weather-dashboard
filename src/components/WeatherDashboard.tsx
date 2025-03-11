import { useState, useEffect } from "react";
import CitySelector from "./CitySelector";
import WeatherCard from "./WeatherCard";
import ForecastSidebar from "./ForecastSidebar";
import { fetchWeatherData, fetchWeatherForecast } from "../api/api";
import { getStoredCities, saveCities } from "../utils/storage";
import { capitalizeCityName } from "../utils/utils";

const WeatherDashboard = () => {
    // State for storing city names, weather data, and errors
    const [cities, setCities] = useState<string[]>(getStoredCities());
    const [weatherData, setWeatherData] = useState<Record<string, any>>({});
    const [forecastData, setForecastData] = useState<any | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string | null>>({});
    const [forecastError, setForecastError] = useState<string | null>(null);
    const [loading, setLoading] = useState<Record<string, boolean>>({});
    const [addCityError, setAddCityError] = useState<string | null>(null);
    const [draggedCity, setDraggedCity] = useState<string | null>(null);

    // Fetch weather data for each city when the cities list changes
    useEffect(() => {
        cities.forEach(async (city) => {
            setLoading(prev => ({ ...prev, [city]: true })); // Mark city as loading

            const { data, error } = await fetchWeatherData(city);

            if (error) {
                setErrors(prev => ({ ...prev, [city]: error }));
                setWeatherData(prev => ({ ...prev, [city]: null }));
            } else {
                setWeatherData(prev => ({ ...prev, [city]: data }));
                setErrors(prev => ({ ...prev, [city]: null }));
            }

            setLoading(prev => ({ ...prev, [city]: false })); // Mark city as not loading
        });
    }, [cities]);

    // Adds a new city and fetches its weather data
    const addCity = async (city: string) => {
        if (cities.includes(city)) {
            setAddCityError(`Weather Data for "${capitalizeCityName(city)}" is already here`);
            return;
        }

        setAddCityError(null);
        setLoading(prev => ({ ...prev, [city]: true }));

        const { data, error } = await fetchWeatherData(city);

        if (error) {
            setAddCityError(error === "City not found" ? `"${city}" is not a valid city` : error);
        } else {
            const updatedCities = [...cities, city];
            setCities(updatedCities);
            saveCities(updatedCities); // Persist new city order
            setWeatherData(prev => ({ ...prev, [city]: data }));
            setErrors(prev => ({ ...prev, [city]: null }));
        }

        setLoading(prev => ({ ...prev, [city]: false }));
    };

    // Removes a city from the list and updates local storage
    const removeCity = (city: string) => {
        const newCities = cities.filter(c => c !== city);
        setCities(newCities);
        saveCities(newCities); // Persist changes

        setWeatherData(prev => {
            const newData = { ...prev };
            delete newData[city];
            return newData;
        });

        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[city];
            return newErrors;
        });

        setLoading(prev => {
            const newLoading = { ...prev };
            delete newLoading[city];
            return newLoading;
        });
    };

    // Fetches forecast data for a selected city
    const showForecast = async (city: string) => {
        setSelectedCity(city);

        const { data, error } = await fetchWeatherForecast(city);

        if (error) {
            setForecastData(null);
            setForecastError(error);
        } else {
            setForecastData(data);
            setForecastError(null);
        }
    };

    // Closes the forecast sidebar
    const closeSidebar = () => {
        setSelectedCity(null);
        setForecastData(null);
    };

    // Clears city input error when user interacts with the input field
    const onCitySelectorClick = () => {
        setAddCityError(null);
    };

    // Handles dragging of a weather card
    const handleDragStart = (city: string) => {
        setDraggedCity(city);
    };

    // Allows dropping by preventing default behavior
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    // Handles dropping and rearranging the order of cities
    const handleDrop = (targetCity: string) => {
        if (!draggedCity || draggedCity === targetCity) return;

        const updatedCities = [...cities];
        const fromIndex = updatedCities.indexOf(draggedCity);
        const toIndex = updatedCities.indexOf(targetCity);

        updatedCities.splice(fromIndex, 1); // Remove dragged city
        updatedCities.splice(toIndex, 0, draggedCity); // Insert at new position

        setCities(updatedCities);
        saveCities(updatedCities); // Persist new order in local storage
    };

    return (
        <div className="dashboard">
            <CitySelector onClick={onCitySelectorClick} onAddCity={addCity} />
            {addCityError && <p className="error-message">{addCityError}</p>} {/* Display city input error */}

            {/* Weather Cards List (Draggable) */}
            <div className="weather-cards">
                {cities.map(city => (
                    <div
                        key={city}
                        draggable
                        onDragStart={() => handleDragStart(city)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(city)}
                    >
                        <WeatherCard 
                            city={city} 
                            data={weatherData[city]} 
                            error={errors[city]}
                            loading={loading[city] || false}
                            onRemove={() => removeCity(city)} 
                            onClick={() => showForecast(city)}
                        />
                    </div>
                ))}
            </div>

            {/* Forecast Sidebar */}
            <ForecastSidebar 
                lat={selectedCity ? weatherData[selectedCity]?.coord.lat : 0}
                lon={selectedCity ? weatherData[selectedCity]?.coord.lon : 0}
                selectedCity={selectedCity} 
                forecastData={forecastData}
                forecastError={forecastError}
                closeSidebar={closeSidebar} 
            />
        </div>
    );
};

export default WeatherDashboard;
