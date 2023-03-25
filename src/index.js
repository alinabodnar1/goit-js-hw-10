import './css/styles.css';
import { fetchCountries } from "./fetchCountries";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const inputCountry = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
let countryName = '';

inputCountry.addEventListener('input', debounce(enterCountry, DEBOUNCE_DELAY));

function enterCountry() {
    countryName = inputCountry.value.trim();
    
    if (countryName === "") {
        countryInfo.innerHTML = "";
        return;
    }
    fetchCountries(countryName)
        .then(renderCountries)
        .catch(showError)
        .finally(() => countryName === "");
}

function showError() {
    Notify.failure("Oops, there is no country with that name");
}

function renderCountries(countries) {
    if (countries.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
        return;
    }
    if (countries.length > 1 && countries.length <= 10) {
        const counrty = countries.map(({ flags, name }) => {
            return `<li class="wrap">
            <img class="img" src="${flags.svg}" alt="${name.official} width="30" height="30"></img>
            <h2 class="country">${name.official}</h2>
                </li>`;
        }).join("");
        countryInfo.innerHTML = counrty;
        return;
    }
    if (countries.length === 1) {
        const counrty = countries.map(({ flags, name, capital, population, languages }) => {
            return `<div>
            <div class="wrap">
            <img class="img" src="${flags.svg}" alt="${name.official}></img>
            <h2 class="country">${name.official}</h2>
            </div>
            <p><b>Capital: </b>${capital}</p>
            <p><b>Population: </b>${population}</p>
            <p><b>Languages: </b>${Object.values(languages)}</p>
            </div>`;
        }).join("");
        countryInfo.innerHTML = counrty;
        return;
    }
}