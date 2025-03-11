const API_KEY = "c2e02e84df6e695629c33c0eaf421142";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeatherData = async (city: string): Promise<any> => {
    const response = await fetch(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);
    if (!response.ok) throw new Error("Failed to fetch weather data");
    return await response.json();
};

export const fetchWeatherForecast = async (city: string) => {
    const response = await fetch(`${BASE_URL}/forecast/daily?q=${city}&cnt=10&units=metric&appid=${API_KEY}`);
    if (!response.ok) throw new Error("Failed to fetch weather forecast");

    const data = await response.json();
    return data.list.map((day: any) => ({
        date: new Date(day.dt * 1000).toLocaleDateString(),
        tempMin: day.temp.min,
        tempMax: day.temp.max,
        weather: day.weather[0].main,
    }));
};