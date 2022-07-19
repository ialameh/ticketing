let errors = 0;
let awayIsChecked = false

// const allElements = document.querySelectorAll()
const ticketingForm = document.getElementById('ticketingForm')
const addPassenger = document.getElementById('addPassenger')
const saveAPI = document.getElementById('saveAPI')
const withoutWeather = document.getElementById('withoutWeather')
const apiKeyElement = document.querySelector('#api')
const afterAPIElement = document.getElementById('afterAPI')
const apiBlockElement = document.querySelector('#apiBlock')
const returnElement = document.querySelector('#returnDate')
const roundtripElement = document.querySelector('#roundtrip')
const preferenceElement = document.querySelector('#preference')
const onewayElement = document.querySelector('#oneway')
const departureElement = document.querySelector('#departure')
const departureTemperatureElement = document.querySelector('#departureTemperature')
const arrivalElement = document.querySelector('#arrival')
const arrivalTemperatureElement = document.querySelector('#arrivalTemperature')
const travelElement = document.querySelector('#travelDate')
const passenger1Element = document.querySelector('#passenger1')
const male1Element = document.querySelector('#male1')
const female1Element = document.querySelector('#female1')
const age1Element = document.querySelector('#age1')
const passenger2Element = document.querySelector('#passenger2')
const male2Element = document.querySelector('#male2')
const female2Element = document.querySelector('#female2')
const age2Element = document.querySelector('#age2')
const emailElement = document.querySelector('#emailAddress')
const mobileElement = document.querySelector('#mobilePhone')
const emailValidation = /^[a-z0-9._%+-]{1,64}@[a-z0-9.-]{1,252}\.[a-z]{2,10}$/i;
const phoneValidation = /^[0-9+ ()]{8,16}$/i;
const ageValidation = /^[0-9]{1,2}$/i;

function validateForm() {

    awayIsChecked = (onewayElement.checked || roundtripElement.checked)

    validateError(awayIsChecked, preferenceElement)

    let departure = departureElement.value
    validateError(departure, departureElement)
    if (departure && apiKeyElement.value !== 'NONE') getWeather(departure, departureTemperatureElement)

    let arrival = arrivalElement.value
    validateError(arrival, arrivalElement)
    if (arrival && apiKeyElement.value !== 'NONE') getWeather(arrival, arrivalTemperatureElement)



    let travelDate = travelElement.value
    validateError(travelDate, travelElement)

    let returnDate = returnElement.value
    if (awayIsChecked && roundtripElement.checked) {
        validateError(returnDate, returnElement)
    } else {
        validateError(true, returnElement)
    }



    let passenger1 = passenger1Element.value
    validateError((passenger1.length > 5), passenger1Element)



    let gender1 = document.querySelector('#gender1')
    validateError((male1Element.checked || female1Element.checked), gender1)

    let age1 = age1Element.value
    validateError(ageValidation.test(age1), age1Element)

    let passenger2 = passenger2Element.value
    if (passenger2) {
        validateError((passenger2.length > 5), passenger2Element)


        let gender2 = document.querySelector('#gender2')
        validateError((male2Element.checked || female2Element.checked), gender2)

        let age2 = age2Element.value
        validateError(ageValidation.test(age2), age2Element)
    }

    let email = emailElement.value
    validateError(emailValidation.test(email), emailElement)
    let mobile = mobileElement.value
    validateError(phoneValidation.test(mobile), mobileElement)

}
ticketingForm.addEventListener('submit', (e) => {
    if (!errors) {
        window.alert('your ticket request was successfully submitted')
    }
    errors = 0;
    e.preventDefault()
})
addPassenger.addEventListener('click', (e) => {
    addPassenger.style.display = 'none'
    const secondPassenger = document.getElementById('secondPassenger')

    secondPassenger.style.display = 'block'


})

saveAPI.addEventListener('click', async (e) => {

    const apiKeyValid = await apikeyIsValid();
    if (apiKeyValid) {
        afterAPIElement.style.display = 'block'
    }
})

withoutWeather.addEventListener('click', (e) => {
    apiKeyElement.value = 'NONE'
    apiBlockElement.style.display = 'none'
    afterAPIElement.style.display = 'block'
})
roundtripElement.addEventListener('click', (e) => {
    validateForm()
})
onewayElement.addEventListener('click', (e) => {
    validateForm()
})
// allElements.addEventListener('touchstart', (e) => {
//     validateForm()
// })
function validateError(result, element) {

    result ? valid(element) : invalid(element)
}
function invalid(element) {
    element.classList.add("is-invalid");
    errors++;
}
function valid(element) {
    element.classList.remove("is-invalid");
}

async function getWeather(city, htmlElement) {
    const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
    const contentType = 'contentType=json'
    const apiKey = apiKeyElement.value;
    const endpoint = `${url}${city}?key=${apiKey}&unitGroup=metric&${contentType}`

    try {
        const response = await fetch(endpoint, { cache: 'no-cache' });
        if (response.ok) {
            const jsonResponse = await response.json();
            htmlElement.innerHTML = `Temp is ${jsonResponse.currentConditions.temp.toString()}°C<br><div class="row"><div class="text-center"><img src="icons/${jsonResponse.currentConditions.icon.toString()}.svg" class="w-25 ml-3" alt="${jsonResponse.currentConditions.icon.toString()}"></div>
            </div>`
        }
    } catch (error) {
    }

}

async function apikeyIsValid() {
    const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
    const contentType = 'contentType=json'
    const city = 'beirut'
    const apiKey = apiKeyElement.value;
    const endpoint = `${url}${city}?key=${apiKey}&unitGroup=metric&${contentType}`

    try {
        const response = await fetch(endpoint);
        if (response.ok) {
            apiBlockElement.style.display = 'none'
            afterAPIElement.style.display = 'block'
        } else {
            validateError(false, apiKeyElement)
        }
    } catch (error) {
        console.log(error.message)
    }

}