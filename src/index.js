import './css/styles.css';
import fetchCountries from './fetchCountries.js';
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix';

let country;
const DEBOUNCE_DELAY = 300;
const searchCountry = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchCountry.addEventListener('input', debounce(getCountryName, DEBOUNCE_DELAY));

function getCountryName (event) {
    event.preventDefault();
    country = event.target.value.trim();
    return country;
}

fetchCountries(country).then(data => {
      const {name:{official}, capital, population, flags:{svg}, languages} = data[0];
})