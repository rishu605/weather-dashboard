import CitySelector from "./CitySelector"
import WeatherCard from "./WeatherCard"

const WeatherDashboard = () => {
    return (
        <div>
            <h1>Weather Dashboard</h1>
            <CitySelector/>
            <WeatherCard/>
        </div>
    )
}

export default WeatherDashboard