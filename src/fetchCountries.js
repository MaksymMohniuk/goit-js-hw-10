

export function fetchCountries(countries) {
    return fetch(`https://restcountries.com/v3.1/name/${countries}?fields=name,capital,population,flags,languages`).then(
        (response) => {
          if (!response.ok) {
            throw new Error(console.log);
          }
          return response.json();
        }
      ); 
}
