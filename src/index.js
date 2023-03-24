import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { getCountries } from "./fetchCountries";
import { renderCountries } from './renderCountry';

const DEBOUNCE_DELAY = 300;
const inputCountry = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
let countyName = '';

inputCountry.addEventListener('input', debounce(enterCountry, DEBOUNCE_DELAY));

function enterCountry() {
    countyName = inputCountry.value.trim();
    
    if (countyName === "") {
        countryInfo.innerHTML = "";
        return;
    }

    getCountries(countyName)
        .then(renderCountries)
        .catch(showError)
        .finally(() => countyName === "");
}

function showError() {
    Notify.failure("Oops, there is no country with that name");
}

// import './css/styles.css';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import debounce from 'lodash.debounce';
// // import getCountry from "./fetchCountries";
// // import BASE_URL from "./fetchCountries";
// // import  makeupCountry from './renderCountry';

// const DEBOUNCE_DELAY = 300;
// const inputCountry = document.querySelector('#search-box');
// const countryInfo = document.querySelector('.country-info');
// const page = 1;
// let countyName = '';
// inputCountry.addEventListener('input', debounce(enterCountry, DEBOUNCE_DELAY));

// function enterCountry() {
//     countyName = inputCountry.value.trim();
    
//     if (countyName === "") {
//         countryInfo.innerHTML = "";
//         return;
//     }

//     fetchCountries(countyName)
//         .then(renderCountries)
//         .catch(showError)
//         .finally(() => countyName === "");
// }

// function fetchCountries(name) {
//     const BASE_URL = "https://restcountries.com/v3.1/name/";
//     const FILTRED_FIELDS = "name,capital,population,flags,languages"
//     return fetch(BASE_URL + `${name}?fields=${FILTRED_FIELDS}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(response.status);
//             }
//             return response.json()
//         });   
// }

// function renderCountries(countries) {
//     if (countries.length > 10) {
//         Notify.info("Too many matches found. Please enter a more specific name.");
//         return;
//     }
//     if (countries.length > 1 && countries.length <= 10) {
//         const counrty = countries.map(({ flags, name }) => {
//             return `<li>
//             <img class="img" src="${flags.svg}" alt="${name.official} width="30" height="30"></img>
//             <h2 class="country">${name.official}</h2>
//                 </li>`;
//         }).join("");
//         countryInfo.innerHTML = counrty;
//         return;
//     }
//     if (countries.length === 1) {
//         const counrty = countries.map(({ flags, name, capital, population, languages }) => {
//             return `<li>
//             <img class="img" src="${flags.svg}" alt="${name.official} width="20" height="20"></img>
//             <h2 class="country">${name.official}</h2>
//             <p><b>Capital: </b>${capital}</p>
//             <p><b>Population: </b>${population}</p>
//             <p><b>Languages: </b>${Object.values(languages)}</p>
//             </li>`;
//         }).join("");
//         countryInfo.innerHTML = counrty;
//         return;
//     }
// }
// // Обробка помилки
// function showError() {
//     Notify.failure("Oops, there is no country with that name");
// }