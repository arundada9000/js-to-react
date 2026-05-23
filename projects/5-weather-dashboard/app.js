const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const infoBox = document.getElementById("weather-info");

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) return;

  infoBox.innerHTML = '<span class="placeholder">Searching weather...</span>';

  try {
    // 1. Fetch Coordinates from Open-Meteo Geocoding
    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("City not found. Try another city name.");
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2. Fetch Actual Weather Forecast using Coordinates
    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const weatherData = await weatherResponse.json();

    const { temperature, windspeed } = weatherData.current_weather;

    // Render results
    infoBox.innerHTML = `
      <h3 class="city-name">${name}, ${country}</h3>
      <div class="temp">${temperature}°C</div>
      <p class="wind">💨 Wind Speed: ${windspeed} km/h</p>
    `;

  } catch (error) {
    infoBox.innerHTML = `<p class="error">${error.message}</p>`;
  }
});
