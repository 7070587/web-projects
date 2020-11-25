const search: HTMLInputElement = <HTMLInputElement>document.getElementById("search");

const form: HTMLElement = document.getElementById("form");
const main: HTMLElement = document.getElementById("main");

const apikey = "3265874a2c77ae4a04bb96236a642d2f";
const url = (city): string => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city: string): Promise<void> {
  const res: any = await fetch(url(city));
  const data = await res.json();

  addWeatherToDOM(data);
}

function addWeatherToDOM(data: any): void {
  main.innerHTML = "";

  const weather: HTMLElement = document.createElement("div");

  const weatherText: string = data.weather && data.weather[0].main ? data.weather[0].main : "";
  const weatherIcon: string = data.weather && data.weather[0].icon ? data.weather[0].icon : "";
  const temp: string = FahrenheitToCelsius(data.main.temp);

  weather.innerHTML = `
    <div class="main__container">
        <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png">
        <span class="main__temperature">${temp}</span>
        <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png">
    </div>

    <div class="main__weather">${weatherText}</div>
    `;

  main.appendChild(weather);
}

function FahrenheitToCelsius(fahrenheit: number): string {
  return !Number.isNaN(fahrenheit) ? Math.floor(fahrenheit - 273.15).toString() + " °C" : "No Data";
}

// getWeatherByLocation("taipei");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue: string = search.value.trim();
  getWeatherByLocation(searchValue);
});
