let errors=0;

function validateForm() {
    const ticketingForm = document.getElementById('ticketingForm')
    let emailValidation = /^[a-z0-9._%+-]{1,64}@[a-z0-9.-]{1,252}\.[a-z]{2,10}$/i;
    let phoneValidation = /^[0-9+ ()]{8,16}$/i;
    let ageValidation = /^[0-9]{1,2}$/i;

    let onewayElement = document.querySelector('#oneway')
    let roundtripElement = document.querySelector('#roundtrip')
    let preferenceElement = document.querySelector('#preference')
    let awayIsChecked = (onewayElement.checked || roundtripElement.checked)
    validateError(awayIsChecked, preferenceElement)

    let departureElement = document.querySelector('#departure')
    let departure = departureElement.value
    validateError(departure, departureElement)

    let travelElement = document.querySelector('#travelDate')
    let travelDate = travelElement.value
    validateError(travelDate, travelElement)

    let returnElement = document.querySelector('#returnDate')
    let returnDate = returnElement.value
    if (awayIsChecked && roundtripElement.checked) {
        console.log(roundtripElement.checked)
        validateError(returnDate, returnElement)
    } else {
        console.log('I am there')
        validateError(true, returnElement)
    }


    let arrivalElement = document.querySelector('#arrival')
    let arrival = arrivalElement.value
    validateError(arrival, arrivalElement)

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
    if (passenger2){
     validateError((passenger2.length > 5), passenger2Element)


    let male2Element = document.querySelector('#male2')
    let female2Element = document.querySelector('#female2')
    let gender2 = document.querySelector('#gender2')
    validateError((male2Element.checked || female2Element.checked), gender2)

    let age2Element = document.querySelector('#age2')
    let age2 = age2Element.value
    validateError(ageValidation.test(age2), age2Element)}

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