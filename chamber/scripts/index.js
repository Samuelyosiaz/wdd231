const navbutton = document.querySelector('#nav-button');
const navbar = document.querySelector('#nav-bar');

navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navbar.classList.toggle('show');
});


/***** Copy Right ******/
const year = new Date().getFullYear();
const copyright = document.querySelector('#currentyear');
copyright.innerHTML = year;


const lastModified = document.querySelector('#lastModified');
lastModified.innerHTML = `Last Modified: ${document.lastModified}`;


//Requied variables for the url
const currentWeatherInfo = document.querySelector('#current-weather-info');

const myKey = "22c95d1dce86f522c1127fa797313725";
const lat = "19.4360";
const long = "-99.1303";

const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${myKey}&units=metric`

async function apiFetch() {
  try {
    const response = await fetch(URL);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing only
      displayResults(data); // uncomment when ready
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

function displayResults(data) {
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const sunrise = data.sys.sunrise;
    const sunrisedate = new Date(sunrise * 1000);
    const sunset = new Date(data.sys.sunrise * 1000);
    currentWeatherInfo.innerHTML = `<img src="${iconsrc}" alt="${data.weather[0].description}" loading="lazy">
    <div>${data.main.temp}&deg;C<br>${data.weather[0].description}<br>High: ${data.main.temp_max}&deg;<br>Low: ${data.main.temp_min}&deg;<br>Humidity: ${data.main.humidity}%<br>Sunrise: ${sunrisedate.toLocaleTimeString([],
        { hour: "2-digit", minute: "2-digit" })}<br>Sunset: ${sunset.toLocaleTimeString([],
            { hour: "2-digit", minute: "2-digit" })}
    `;
}

apiFetch();


//Forecast weather
const foreCastInformation = document.querySelector('#forecast-weather-info');

const newURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${myKey}&units=metric`;

async function fetchForecast() {
  try {
    const response = await fetch(newURL);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing only
      displayForecastResults(data);
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}
function displayForecastResults(data) {
    // Limpiar contenido anterior
    foreCastInformation.innerHTML = '';
    
    // Obtener fechas únicas para los próximos 3 días
    const dailyTemps = {};
    
    // Procesar los datos para agrupar por día
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toDateString();
        
        // Si no existe este día en nuestro objeto, lo agregamos
        if (!dailyTemps[dateKey]) {
            dailyTemps[dateKey] = {
                date: date,
                temps: []
            };
        }
        
        // Agregar la temperatura de este momento del día
        dailyTemps[dateKey].temps.push(item.main.temp);
    });
    
    // Convertir a array y tomar solo los próximos 3 días
    const dailyArray = Object.values(dailyTemps).slice(0, 3);
        // Mostrar cada día
    dailyArray.forEach(day => {
        // Calcular temperatura promedio del día
        const avgTemp = day.temps.reduce((sum, temp) => sum + temp, 0) / day.temps.length;
        
        // Crear elemento para mostrar
        const dayElement = document.createElement('p');
        dayElement.innerHTML = `${day.date.toLocaleDateString('es-ES', { weekday: 'long' })}: ${Math.round(avgTemp)}°C`;
        
        foreCastInformation.appendChild(dayElement);
    });
}

fetchForecast();


//Random Companies Display
const cardssection = document.querySelector('#displayedcards');

// Variable para guardar los datos
let companiesData = [];

//Función para obtener 3 empresas aleatorias
function getRandomCompanies(companies, count = 3) {
    const shuffled = [...companies].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

//Crear tarjetas de las empresas
async function getCompaniesInformation(file) {
    try {
        const response = await fetch(file);
        const data = await response.json();
        
        companiesData = data.companies;
        
        // Obtener 3 empresas aleatorias y mostrarlas
        const randomCompanies = getRandomCompanies(companiesData, 3);
        displayRandomCards(randomCompanies);
    } catch (error) {
        console.log('Error loading companies data:', error);
    }
}

const displayRandomCards = (companies) => {
    cardssection.innerHTML = '';
    
    companies.forEach((company) => {
        const card = document.createElement('div');
        card.classList.add('company-card');

        card.innerHTML = `
            <img src="${company.image_url}" alt="${company.name}" loading="lazy">
            <h3>${company.name}</h3>
            <p><strong>Address:</strong> ${company.address}</p>
            <p><strong>Phone:</strong> ${company.phone}</p>
            <p><strong>Membership:</strong> ${company.membership}</p>
            <p><a href="${company.website}" target="_blank">Visit Site</a></p>
        `;

        cardssection.appendChild(card);
    });
}

// Cargar las empresas cuando se carga la página
getCompaniesInformation('data/members.json');
