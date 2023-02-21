import './css/styles.css';
import fetchCountries from './fetchCountries.js';
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix';

let data;
let countries;
const DEBOUNCE_DELAY = 300;
const searchCountry = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchCountry.addEventListener('input', debounce(getCountryName, DEBOUNCE_DELAY));

function getCountryName (event) {
    event.preventDefault();
    data = event.target.value.trim();
    return data;
}

fetchCountries(data).then(coutries => {
    if(coutries.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
    } else if(countries.length >= 2 && countries.length <=10) {
        const list = countries.reduce((markup, country) => createCountriesList(country) + markup, '');
        createCountriesList(list);
    } else {
        const card = countries.reduce((markup, country) => createCountryCard(country) + markup, '');
        createCountryCard(card);
    }
}
).catch(onError);

function createCountriesList({flags, name}) {
    return `<li>
    <span>${flags.svg}</span>
    <p>${name.official}</p>
    </li>`
}

function createCountryCard({flags, name, capital, population, languages}) {
    return  `<span>${flags.svg}</span>
    <h2>${name.official}</h2>
    <ul>
    <li><p>${capital}</p></li>
    <li><p>${population}</p></li>
    <li><p>${Object.values(languages)}</p></li>
    </ul>
    `
}

function onError(err) {
    Notify.failure("Oops, there is no country with that name");
  }