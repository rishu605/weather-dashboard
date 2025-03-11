export const getStoredCities = (): string[] => {
    return JSON.parse(localStorage.getItem("cities") || "[]");
};

export const saveCities = (cities: string[]) => {
    localStorage.setItem("cities", JSON.stringify(cities));
};
