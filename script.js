const apiKey = MY_API_KEY;
const submitButton = document.querySelector("#search-city");

submitButton.addEventListener("click", () => {
    const cityInput = document.querySelector("#city").value;
    if (!cityInput) {
        handleError("Please enter a city name.");
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
            handleError("Please enter a valid city name.");
            return;
        }
        const data = await response.json();
        const hasError = document.querySelector("#error-result").classList.contains("hidden");
        if (!hasError) {
            document.querySelector("#error-result").classList.add("hidden");
        }
        console.log(data);
        document.querySelector(".location").textContent = data.name;
        document.querySelector(".temperature").textContent = `${Math.round((data.main.temp * 9/5) - 459.67)}°F`;
        const iconCode = data.weather[0].id;
        weatherIcon(iconCode);
        document.querySelector(".description").textContent = data.weather[0].description;
        document.querySelector(".humidity").textContent = `Humidity: ${data.main.humidity}%`;
        document.querySelector("#weather-result").classList.remove("hidden");
    } catch (error) {
        handleError(error.message);
    }
}

function handleError(message) {
    const prevValid = document.querySelector("#weather-result").classList.contains("hidden");
    if (!prevValid) {
        document.querySelector("#weather-result").classList.add("hidden");
    }
    const errorMessage = document.querySelector("#error-text");
    errorMessage.textContent = message;
    document.querySelector("#error-result").classList.remove("hidden");
}

function weatherIcon(temp) {
    const displayIcon = document.querySelector(".temperature-icon");
    if (200 <= temp && temp < 532) {
        displayIcon.innerHTML = '<i class="fa-solid fa-cloud-rain"></i>';
    } else if (600 <= temp && temp < 623) {
        displayIcon.innerHTML = '<i class="fa-solid fa-snowflake"></i>';
    } else if (700 <= temp && temp < 782) {
        displayIcon.innerHTML = '<i class="fa-solid fa-smog"></i>';
    } else if (temp === 800) {
        displayIcon.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else if (801 <= temp && temp < 803) {
        displayIcon.innerHTML = '<i class="fa-solid fa-cloud-sun"></i>';
    } else if (803 <= temp && temp < 805) {
        displayIcon.innerHTML = '<i class="fa-solid fa-cloud"></i>';
    } else {
        displayIcon.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
    }
}