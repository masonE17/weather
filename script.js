const apiKey = MY_API_KEY;
const submitButton = document.getElementById("search-city");

submitButton.addEventListener("click", () => {
    const cityInput = document.getElementById("city").value;
    if (!cityInput) {
        handleError("Please enter a city name.");
    }
    fetchWeatherData(cityInput);
});

async function fetchWeatherData(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            handleError("City not found or is not valid.");
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        handleError("An error occured while fetching the weather data.");
    }
}

function handleError(message) {

}