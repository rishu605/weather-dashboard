import { capitalizeCityName } from "../utils/utils";

const API_KEY = "c2e02e84df6e695629c33c0eaf421142";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeatherData = async (city: string, retries = 3, delay = 1000): Promise<{ data: any; error: string | null }> => {
    try {
        const response = await fetch(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);
        if (!response.ok) throw new Error(`Failed to fetch weather data for ${city}`);
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        if (retries > 0) {
            await new Promise(res => setTimeout(res, delay));
            return fetchWeatherData(city, retries - 1, delay * 2);
        }
        return { data: null, error: (error as Error).message };
    }
};

export const fetchWeatherForecast = async (city: string): Promise<{ data: any[] | null; error: string | null }> => {
    try {
        const response = await fetch(`${BASE_URL}/forecast/daily?q=${city}&cnt=10&units=metric&appid=${API_KEY}`);
        if (!response.ok) throw new Error(`Failed to fetch forecast for ${capitalizeCityName(city)}`);
        const result = await response.json();
        
        const forecast = result.list.map((day: any) => ({
            date: new Date(day.dt * 1000).toLocaleDateString(),
            tempMin: day.temp.min,
            tempMax: day.temp.max,
            weather: day.weather[0].main,
        }));

        return { data: forecast, error: null };
    } catch (error) {
        return { data: null, error: (error as Error).message };
    }
};
