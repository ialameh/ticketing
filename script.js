let errors = 0;
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


function validateForm() {

    let emailValidation = /^[a-z0-9._%+-]{1,64}@[a-z0-9.-]{1,252}\.[a-z]{2,10}$/i;
    let phoneValidation = /^[0-9+ ()]{8,16}$/i;
    let ageValidation = /^[0-9]{1,2}$/i;

    // validateError(apiKey, apiKeyElement)
    // if (apiKey) afterAPIElement.style.display = 'block'

    let awayIsChecked = (onewayElement.checked || roundtripElement.checked)
    validateError(awayIsChecked, preferenceElement)

    let departureElement = document.querySelector('#departure')
    let departure = departureElement.value
    let departureTemperatureElement = document.querySelector('#departureTemperature')
    validateError(departure, departureElement)
    if (departure && apiKeyElement.value !== 'NONE' ) getWeather(departure, departureTemperatureElement)

    let arrivalElement = document.querySelector('#arrival')
    let arrival = arrivalElement.value
    let arrivalTemperatureElement = document.querySelector('#arrivalTemperature')
    validateError(arrival, arrivalElement)
    if (arrival && apiKeyElement.value !== 'NONE' ) getWeather(arrival, arrivalTemperatureElement)



    let travelElement = document.querySelector('#travelDate')
    let travelDate = travelElement.value
    validateError(travelDate, travelElement)

    let returnDate = returnElement.value
    if (awayIsChecked && roundtripElement.checked) {
        validateError(returnDate, returnElement)
    } else {
        validateError(true, returnElement)
    }



    let passenger1Element = document.querySelector('#passenger1')
    let passenger1 = passenger1Element.value
    validateError((passenger1.length > 5), passenger1Element)


    let male1Element = document.querySelector('#male1')
    let female1Element = document.querySelector('#female1')
    let gender1 = document.querySelector('#gender1')
    validateError((male1Element.checked || female1Element.checked), gender1)

    let age1Element = document.querySelector('#age1')
    let age1 = age1Element.value
    validateError(ageValidation.test(age1), age1Element)

    let passenger2Element = document.querySelector('#passenger2')
    let passenger2 = passenger2Element.value
    if (passenger2) {
        validateError((passenger2.length > 5), passenger2Element)


        let male2Element = document.querySelector('#male2')
        let female2Element = document.querySelector('#female2')
        let gender2 = document.querySelector('#gender2')
        validateError((male2Element.checked || female2Element.checked), gender2)

        let age2Element = document.querySelector('#age2')
        let age2 = age2Element.value
        validateError(ageValidation.test(age2), age2Element)
    }

    let emailElement = document.querySelector('#emailAddress')
    let email = emailElement.value
    validateError(emailValidation.test(email), emailElement)

    let mobileElement = document.querySelector('#mobilePhone')
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
    // console.log('your ticket request was successfully submitted')
    addPassenger.style.display = 'none'
    const secondPassenger = document.getElementById('secondPassenger')
    console.log(secondPassenger)

    secondPassenger.style.display = 'block'


})

 saveAPI.addEventListener('click', async (e)  =>  {
    // console.log('your ticket request was successfully submitted')
    // addPassenger.style.display = 'none'
    const apiKeyValid = await apikeyIsValid();
    if (apiKeyValid) {
        afterAPIElement.style.display = 'block'
    }
})

withoutWeather.addEventListener('click', (e)  =>  {
    apiKeyElement.value = 'NONE'
    apiBlockElement.style.display = 'none'
    afterAPIElement.style.display = 'block'
})
roundtripElement.addEventListener('click', (e)  =>  {
validateForm()
})
onewayElement.addEventListener('click', (e)  =>  {
    validateForm()
    })
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
        console.log(response.ok)
        if (response.ok) {
            apiBlockElement.style.display = 'none'
            afterAPIElement.style.display = 'block'
        } else {
            validateError(false, apiKeyElement)
        }
    } catch (error) {
        console.log('what an error')
        console.log(error.message)
    }

}