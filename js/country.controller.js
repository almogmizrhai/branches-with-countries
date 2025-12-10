// js/country.controller.js

'use strict'


const storageKey = 'SearchedCountries' 
var gSearchedCountries = loadFromStorage(storageKey) || []


function onInit() {
    console.log('Country controller initialized')
}

function searchCountry(){
    const countryName = document.querySelector('.country-input').value
    const elLoader = document.querySelector('.loader')
    const elResult = document.querySelector('.result')
    
    elLoader.classList.remove('hide')

    if(gSearchedCountries.find(c => c.countryName.toLowerCase() === countryName.toLowerCase())){
        console.log('Country data is already loaded!')

        const countryIndex = gSearchedCountries.findIndex(c => c.countryName.toLowerCase() === countryName.toLowerCase())
        onGetCountryInfo(countryName, gSearchedCountries[countryIndex].data)
        
        elLoader.classList.add('hide')
        elResult.classList.remove('hide')
    }else{
        
        getCountryByName(countryName)
        .then((data) => {
            onGetCountryInfo(countryName, data)
        })
        .catch((err) => {
            console.error('Error fetching country data:', err)
        })
        .finally(() => {
            elLoader.classList.add('hide')
            elResult.classList.remove('hide')
        })
    }
}

function onGetCountryInfo(countryName, data) {
    const countryData = data[0]

    if (!gSearchedCountries.some(c => c.countryName.toLowerCase() === countryName.toLowerCase())) {
        gSearchedCountries.push({ countryName, data })
        saveToStorage(storageKey, gSearchedCountries)
    }

    renderInfo(countryName, countryData)
}

function renderInfo(countryName, countryData) {
    if (!countryData) return

    const elResultInfo = document.querySelector('.result-info')

    var strHTML = `<h2 class="country-name">Country Name: ${countryName}</h2>
    <h3>Flag:</h3>
    <img src="${countryData.flags.png}" alt="flag of ${countryName}" class="country-flag">
    <p class="country-population">Country Population: ${countryData.population}</p>
    <p class="country-area">Country Area: ${countryData.area}</p>`

    elResultInfo.innerHTML = strHTML
}