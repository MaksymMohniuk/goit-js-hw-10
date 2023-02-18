

export function fetchCountries(name) {
    return fetch('https://restcountries.com/v3.1/name/{name}?fields=name,capital,population,flags,languages').then(
        (response) => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        }
      ).then(data => {
        const {name:{official}, capital, population, flags:{svg}, languages} = data[0];
        console.log(data[0]);  
    }
      ); 
}
