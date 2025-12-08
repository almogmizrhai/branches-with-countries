

'use strict'


const BASE_URL = 'https://restcountries.com/v3.1/name/'

function getCountryByName(name) {
    const url = BASE_URL + encodeURIComponent(name)
    return get(url)
}