// const API_KEY = "ed6bb9668aa341558760e8d2e21d539e"; 
const url = "https://newsapi.org/v2/everything?q=";
const API_KEY ="58999131860845a9baff8feb12c24dfb";
const url1="https://newsapi.org/v2/top-headlines?q="
window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}
document.querySelector('.top-news').addEventListener('click' ,topNews);


async function fetchNews(query) {
    const res = await fetch(`${url}${query}&from=2025-03-25&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}
async function topNews(){
    const res = await fetch('https://newsapi.org/v2/top-headlines?country=us&from=2024-12-23category=everything&apiKey=58999131860845a9baff8feb12c24dfb');
    const data = await res.json();
    bindData(data.articles);
}


function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

const nav = document.querySelector('.nav-section2');


window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        nav.classList.add('nav-shadow'); // Add shadow class when scrolled
    } else {
        nav.classList.remove('nav-shadow'); // Remove shadow class when at the top
    }
});

// Select the toggle input
const toggle = document.getElementById('dark-mode-toggle');



// Add an event listener to toggle dark mode
toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
   
    // document.querySelector('.contact-us').classList.toggle('darkmode-background')
   
   let getTime=document.querySelector('.present-time')
   console.log(getTime)
   getTime.classList.toggle('datetime')
 // document.querySelector('.contact-us-section1').classList.toggle('darkmode-color')
//    let contactcards= document.querySelectorAll('.contact-card');
//    for(let i=0; i<contactcards.length;i++){
//       contactcards[i].classList.toggle('dark-mode');
 //  }
//    let contactpara=document.querySelectorAll('.contact-card h3');
//    for(let i=0; i<contactpara.length; i++){
//    contactpara[i].classList.add('darkmode-color')
//    }
 
  
//   let cards=document.querySelectorAll('.card');
//   for(let i=0; i<cards.length; i++){
//     cards[i].classList.toggle('dark-mode')
//   }

  const isDarkMode = document.body.classList.contains('dark-mode');

  // Save theme to localStorage
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// Apply saved theme on load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    toggle.checked = true;
  }
});
// document.querySelector('.contact-card').classList.add('dark-mode')


let date=document.querySelector('.date');
let time=document.querySelector('.time');

setInterval(()=>{
 let date1=new Date().toLocaleDateString();
 let time1=new Date().toLocaleTimeString().toLocaleUpperCase();
 
 date.innerText=date1;
 time.innerText=time1;
},1000)



const apiKey = '03d8d0be6ad794de4b04f0ae2ed819d7';
        const searchButton1 = document.getElementById('search');
        const cityInput = document.getElementById('city');
        const weatherDataDiv = document.getElementById('weather-data');
        const forecastDataDiv = document.getElementById('forecast-data');

        document.addEventListener('DOMContentLoaded', () => {
            fetchWeatherData('Noida');
            fetchForecastData('Noida');
        });

        searchButton1.addEventListener('click', () => {
            const city = cityInput.value;
            if (!city) return;
            fetchWeatherData(city);
            fetchForecastData(city);
        });

        function fetchWeatherData(city) {
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;
            fetch(weatherUrl)
                .then(response => response.json())
                .then(data => {
                    displayWeatherData(data);
                })
                .catch(err => {
                    weatherDataDiv.innerHTML = `<div class='data'>Error fetching weather data.</div>`;
                });
        }

        function displayWeatherData(data) {
            if (data.cod !== 200) {
                weatherDataDiv.innerHTML = `<div class='data'>${data.message}</div>`;
                return;
            }

            // Mapping weather conditions to icons
            const moodIcons = {
                Clear: "fas fa-sun",
                Clouds: "fas fa-cloud",
                Rain: "fas fa-cloud-showers-heavy",
                Snow: "fas fa-snowflake",
                Thunderstorm: "fas fa-bolt",
                Mist: "fas fa-smog",
                Haze: "fas fa-smog",
                Fog: "fas fa-smog"
            };

            const moodIcon = moodIcons[data.weather[0].main] || "fas fa-question-circle";

            weatherDataDiv.innerHTML = `
                <div class="weather-info">
                    <div class="info-card">
                        <div class="icon"><i class="fas fa-thermometer-half"></i></div>
                        <div>Temperature</div>
                        <div>${data.main.temp} &#8451;</div>
                    </div>
                    <div class="info-card">
                        <div class="icon"><i class="fas fa-tint"></i></div>
                        <div>Humidity</div>
                        <div>${data.main.humidity}%</div>
                    </div>
                    <div class="info-card">
                        <div class="icon"><i class="fas fa-wind"></i></div>
                        <div>Wind Speed</div>
                        <div>${data.wind.speed} m/s</div>
                    </div>
                    <div class="info-card">
                        <div class="icon"><i class="fas fa-cloud"></i></div>
                        <div>Weather</div>
                        <div>${data.weather[0].description}</div>
                    </div>
                </div>
                <div class="weather-mood">
                    <i class="${moodIcon}"></i>
                    <div>${data.weather[0].main}</div>
                </div>
            `;
        }

        function fetchForecastData(city) {
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${apiKey}`;
            fetch(forecastUrl)
                .then(response => response.json())
                .then(data => {
                    displayForecastData(data);
                })
                .catch(err => {
                    forecastDataDiv.innerHTML = `<div class='data'>Error fetching forecast data.</div>`;
                });
        }

        function displayForecastData(data) {
            if (data.cod !== "200") {
                forecastDataDiv.innerHTML = `<div class='data'>${data.message}</div>`;
                return;
            }

            const forecastHtml = data.list.slice(0, 4).map(item => {
                return `
                    <div class="forecast-card">
                        <div class="date">${new Date(item.dt_txt).toLocaleDateString()}</div>
                        <div class="temp">${item.main.temp} &#8451;</div>
                        <div class="desc">${item.weather[0].description}</div>
                    </div>
                `;
            }).join('');

            forecastDataDiv.innerHTML = forecastHtml;
        }

        document.querySelector('a[href="#top"]').addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
         

          
          const prev = document.querySelector('.previous1');
          const forw = document.querySelector('.forward1');
          const slides = document.querySelectorAll('.slide');
          
          let counter = 0;
          
          // Set initial positions of slides
          slides.forEach((slide, index) => {
              slide.style.left = `${index * 100}%`;
          });
          
          // Function to slide images
          const slideImages = () => {
              slides.forEach((slide) => {
                  slide.style.transform = `translateX(-${counter * 100}%)`;
              });
          };
          
          // Event listeners for manual navigation
          prev.addEventListener('click', () => {
              counter = (counter - 1 + slides.length) % slides.length; // Ensure counter loops
              slideImages();
          });
          
          forw.addEventListener('click', () => {
              counter = (counter + 1) % slides.length; // Ensure counter loops
              slideImages();
          });
          
          // Auto-slide forward every 3 seconds
          setInterval(() => {
              counter = (counter + 1) % slides.length; // Increment counter forward
              slideImages();
          }, 3000);
          