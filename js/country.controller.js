'use strict'

function onGetCountryInfo() {
    console.log('Hi')
}

function renderInfo(data) {
    const elResultOutput = document.querySelector('.result-output')
    elResultOutput.innerText = JSON.stringify(data, null, 2)
}

function searchCountry(){
    const countryName = document.querySelector('.country-input').value
    const elLoader = document.querySelector('.loader')
    const elResult = document.querySelector('.result')
    
    elLoader.classList.remove('hide')

    getCountryByName(countryName)
        .then((data) => {
            console.log('Country data received:', data)
            renderInfo(data)
        })
        .catch((err) => {
            console.error('Error fetching country data:', err)
        })
        .finally(() => {
            elLoader.classList.add('hide')
            elResult.classList.remove('hide')
        })
}