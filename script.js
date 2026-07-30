const apiKey = MY_API_KEY;
const submitButton = document.querySelector("#search-city");

submitButton.addEventListener("click", () => {
    const cityInput = document.querySelector("#city").value;
    if (!cityInput) {
        console.log("Please enter a city name.");
        return;
    }
    fetchWeatherData(cityInput);
    document.querySelector("#city").value = "";
});

async function fetchWeatherData(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            console.log("Error fetching weather data.");
            return;
        }
        const data = await response.json();
        document.querySelector(".location").textContent = data.name;
        document.querySelector(".temperature").textContent = `${Math.round((data.main.temp * 9/5) - 459.67)}°F`;
        document.querySelector(".description").textContent = data.weather[0].description;
        document.querySelector(".humidity").textContent = `Humidity: ${data.main.humidity}%`;
        document.querySelector("#weather-result").classList.remove("hidden");
    } catch (error) {
        console.log(error);
    }
}

function handleError(message) {

}

function weatherIcon(temperature) {

}