import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

interface CityMapProps {
    lat: number; // Latitude of the city
    lon: number; // Longitude of the city
    city: string; // City name
}

/**
 * Updates the map view when latitude or longitude changes.
 */
const UpdateMapView = ({ lat, lon }: { lat: number; lon: number }) => {
    const map = useMap();

    useEffect(() => {
        map.setView([lat, lon], 10, { animate: true });
    }, [lat, lon, map]);

    return null;
};

/**
 * CityMap Component
 * Displays an interactive map centered on the given city.
 */
const CityMap: React.FC<CityMapProps> = ({ lat, lon, city }) => {
    return (
        <MapContainer style={{ height: "300px", width: "100%" }}>
            <UpdateMapView lat={lat} lon={lon} />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[lat, lon]}>
                <Popup>{city}</Popup>
            </Marker>
        </MapContainer>
    );
};

export default CityMap;
