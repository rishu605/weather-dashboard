export const getWeatherIcon = (weatherType: string) => {
    switch (weatherType.toLowerCase()) {
        case "clear":
            return "☀️"; // Sunny
        case "clouds":
            return "☁️"; // Cloudy
        case "rain":
            return "🌧️"; // Rainy
        case "thunderstorm":
            return "⛈️"; // Thunderstorm
        case "snow":
            return "❄️"; // Snowy
        case "drizzle":
            return "🌦️"; // Light rain
        case "mist":
        case "fog":
            return "🌫️"; // Foggy
        case "haze":
            return "🌁"; // Hazy
        default:
            return "🌍"; // Default icon
    }
};

export const capitalizeCityName = (name: string): string => {
    return name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}