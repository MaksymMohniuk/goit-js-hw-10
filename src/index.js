import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

let data;
const DEBOUNCE_DELAY = 300;
const searchCountry = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchCountry.addEventListener(
  'input',
  debounce(getCountryName, DEBOUNCE_DELAY)
);

function getCountryName(event) {
  data = event.target.value.trim();
  if(data.length === 0) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
  fetchCountries(data)
    .then(countries => {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length >= 2 && countries.length <= 10) {
        const list = countries.reduce(
          (markup, country) => createCountriesList(country) + markup,
          ''
        );
        renderCountryList(list);
      } else {
        renderCountryCard(createCountryCard(countries[0]));
      }
    })
    .catch(Notiflix.Notify.failure('Oops, there is no country with that name'));
}

function renderCountryList(string) {
  countryList.insertAdjacentHTML('beforeend', string);
}

function renderCountryCard(obj) {
  countryInfo.insertAdjacentHTML('beforeend', obj);
}

function createCountriesList({ flags, name }) {
  return `<li class='card'>
    <span> <img src='${flags.svg}' alt='flag' width='40' /></span>
    <b>${name.official}</b>
    </li>`;
}

function createCountryCard({ flags, name, capital, population, languages }) {
  return `<span><img src='${flags.svg}' alt='flag' width='70' /></span>
    <h2>${name.official}</h2>
    <ul>
    <li class='list'><b>Capital: ${capital}</b></li>
    <li class='list'><b>Population: ${population}</b></li>
    <li class='list'><b>Languages: ${Object.values(languages)}</b></li>
    </ul>
    `;
}
