
export function fetchCountries(NAME) {
    const BASE_URL = 'https://restcountries.com/v3.1/'
     const URL = `${BASE_URL}name/${NAME}?fields=name,flags,capital,population,languages`
    return fetch(URL).then(resp => 
        {if (!resp.ok) {
        throw new Error(resp.statusText)
    }
        console.log(resp);
        return resp.json();
    })
}
 
