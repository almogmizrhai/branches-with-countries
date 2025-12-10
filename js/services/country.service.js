// js/services/country.service.js

'use strict'


const BASE_URL = 'https://restcountries.com/v3.1/name/'

function getCountryByName(name) {
    const url = BASE_URL + encodeURIComponent(name)
    return get(url)
}

function getCountryByCode(code) {
    const url = `https://restcountries.com/v3.1/alpha/${encodeURIComponent(code)}`
    return get(url)
}