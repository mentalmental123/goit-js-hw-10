import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
const DEBOUNCE_DELAY = 350;



const countriesInput = document.querySelector('#search-box')
const countriesList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countriesInput.addEventListener('input', debounce(getContries, DEBOUNCE_DELAY))

function getContries(evt) {
    const cntryName = evt.target.value;
    
    if (cntryName.trim() === '') {
            countriesList.innerHTML = '';
            countryInfo.innerHTML = '';
            return;
    }

    fetchCountries(cntryName).then(countries => {
        console.log(countries)
        createMarkup(countries)
    }
    ).catch(err =>
    {
        countriesList.innerHTML = '';
        countryInfo.innerHTML = '';

        console.log(err);
        Notify.failure("Oops, there is no country with that name");
    })  
}


function createMarkup(countries) {
    if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (countries.length > 1) {
        countryInfo.innerHTML = '';
        const markup = countries.map(({ flags: { svg, alt }, name: { common } }) => `<li class="country-list-item"><img class='small-img' src="${svg}" alt="${alt}">
      <p class='small-header'>${common}</p></li>`).join('')
        countriesList.innerHTML = markup;
    } else {
        countriesList.innerHTML = '';
        const markup = countries.map(({ flags: { svg, alt }, name: { common }, capital, languages, population }) => `<div class="country-list-item">
        <img class='big-img' src="${svg}" alt="${alt}"/>
        <h2>${common}</h2>
      </div>
      <p><b>Capital:</b> ${capital}</p>
      <p><b>Population:</b> ${population}</p>
      <p><b>Languages:</b> ${Object.values(languages)}</p>`).join('');
        countryInfo.innerHTML = markup;
    }
    
}

