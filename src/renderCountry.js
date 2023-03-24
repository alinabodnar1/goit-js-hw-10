export function renderCountries(countries) {
    if (countries.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
        return;
    }
    if (countries.length > 1 && countries.length <= 10) {
        const counrty = countries.map(({ flags, name }) => {
            return `<li>
            <img class="img" src="${flags.svg}" alt="${name.official} width="30" height="30"></img>
            <h2 class="country">${name.official}</h2>
                </li>`;
        }).join("");
        countryInfo.innerHTML = counrty;
        return;
    }
    if (countries.length === 1) {
        const counrty = countries.map(({ flags, name, capital, population, languages }) => {
            return `<li>
            <img class="img" src="${flags.svg}" alt="${name.official} width="20" height="20"></img>
            <h2 class="country">${name.official}</h2>
            <p><b>Capital: </b>${capital}</p>
            <p><b>Population: </b>${population}</p>
            <p><b>Languages: </b>${Object.values(languages)}</p>
            </li>`;
        }).join("");
        countryInfo.innerHTML = counrty;
        return;
    }
}
