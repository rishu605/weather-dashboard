import { useState, useEffect } from "react";
import CitySelector from "./CitySelector";
import WeatherCard from "./WeatherCard";
import ForecastSidebar from "./ForecastSidebar";
import { fetchWeatherData, fetchWeatherForecast } from "../api/api";
import { getStoredCities, saveCities } from "../utils/storage";
import { capitalizeCityName } from "../utils/utils";

const WeatherDashboard = () => {
    const [cities, setCities] = useState<string[]>(getStoredCities());
    const [weatherData, setWeatherData] = useState<Record<string, any>>({});
    const [forecastData, setForecastData] = useState<any | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string | null>>({});
    const [forecastError, setForecastError] = useState<string | null>(null);
    const [loading, setLoading] = useState<Record<string, boolean>>({});
    const [addCityError, setAddCityError] = useState<string | null>(null); // Error message for CitySelector
    const [draggedCity, setDraggedCity] = useState<string | null>(null);

    useEffect(() => {
        cities.forEach(async (city) => {
            setLoading(prev => ({ ...prev, [city]: true })); // Start loading

            const { data, error } = await fetchWeatherData(city);
            console.log("cityData: ", data)

            if (error) {
                setErrors(prev => ({ ...prev, [city]: error }));
                setWeatherData(prev => ({ ...prev, [city]: null }));
            } else {
                setWeatherData(prev => ({ ...prev, [city]: data }));
                setErrors(prev => ({ ...prev, [city]: null }));
            }

            setLoading(prev => ({ ...prev, [city]: false })); // Stop loading
        });
    }, [cities]);

    const addCity = async (city: string) => {
        if (cities.includes(city)) {
            setAddCityError(`Weather Data for "${capitalizeCityName(city)}" is already here`); // Show error below input
            return;
        }

        setAddCityError(null); // Clear any previous error
        setLoading(prev => ({ ...prev, [city]: true })); // Start loading

        const { data, error } = await fetchWeatherData(city);

        if (error) {
            if (error === "City not found") {
                setAddCityError(`"${city}" is not a valid city`); // Show error below input
            } else {
                setErrors(prev => ({ ...prev, [city]: error }));
            }
        } else {
            const updatedCities = [...cities, city];
            setCities(updatedCities);
            saveCities(updatedCities);
            setWeatherData(prev => ({ ...prev, [city]: data }));
            setErrors(prev => ({ ...prev, [city]: null }));
        }

        setLoading(prev => ({ ...prev, [city]: false })); // Stop loading
    };

    const removeCity = (city: string) => {
        const newCities = cities.filter(c => c !== city);
        setCities(newCities);
        saveCities(newCities); // Remove from local storage
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

    const closeSidebar = () => {
        setSelectedCity(null);
        setForecastData(null);
    };

    const onCitySelectorClick = () => {
        setAddCityError(null); // Clear any previous error
    }

    const handleDragStart = (city: string) => {
        setDraggedCity(city);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(); // Allow dropping
    };

    const handleDrop = (targetCity: string) => {
        if (!draggedCity || draggedCity === targetCity) return;

        const updatedCities = [...cities];
        const fromIndex = updatedCities.indexOf(draggedCity);
        const toIndex = updatedCities.indexOf(targetCity);

        updatedCities.splice(fromIndex, 1); // Remove dragged city
        updatedCities.splice(toIndex, 0, draggedCity); // Insert at new position

        setCities(updatedCities);
        saveCities(updatedCities); // Persist new order in localStorage
    };

    return (
        <div className="dashboard">
            <CitySelector onClick={onCitySelectorClick} onAddCity={addCity} />
            {addCityError && <p className="error-message">{addCityError}</p>} {/* Show error below input */}
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
                lat={selectedCity ? weatherData[selectedCity]?.coord.lat: 0}
                lon={selectedCity ? weatherData[selectedCity]?.coord.lon: 0}
                selectedCity={selectedCity} 
                forecastData={forecastData}
                forecastError={forecastError}
                closeSidebar={closeSidebar} 
            />
        </div>
    );
};

export default WeatherDashboard;