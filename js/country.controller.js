// js/country.controller.js

'use strict'


const storageKey = 'SearchedCountries' 
var gSearchedCountries = loadFromStorage(storageKey) || []


function onInit() {
    // gSearchedCountries = loadFromStorage(storageKey)
}

function onGetCountryInfo() {
    console.log('Hi')
}

function renderInfo(countryName, data) {
    const elResultOutput = document.querySelector('.result-output')
    elResultOutput.innerText =countryName + ': ' + JSON.stringify(data, null, 2)
    gSearchedCountries.push({countryName, data})
    saveToStorage(storageKey, gSearchedCountries)
    console.log('last searched countries:', gSearchedCountries)
}

function searchCountry(){
    const countryName = document.querySelector('.country-input').value
    const elLoader = document.querySelector('.loader')
    const elResult = document.querySelector('.result')
    
    elLoader.classList.remove('hide')

    if(gSearchedCountries.find(c => c.countryName.toLowerCase() === countryName.toLowerCase())){
        console.log('Country data is already loaded!')

        const countryIndex = gSearchedCountries.findIndex(c => c.countryName.toLowerCase() === countryName.toLowerCase())
        console.log('Loaded from storage:', gSearchedCountries[countryIndex])
        renderInfo(countryName, gSearchedCountries[countryIndex].data)
        
        elLoader.classList.add('hide')
        elResult.classList.remove('hide')
    }else{
        
        getCountryByName(countryName)
        .then((data) => {
            renderInfo(countryName, data)
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