

function validateForm() {
    const ticketingForm = document.getElementById('ticketingForm')
    let emailValidation = /^[a-z0-9._%+-]{1,64}@[a-z0-9.-]{1,252}\.[a-z]{2,10}$/i;
    let phoneValidation = /^[0-9+ ()]{8,16}$/i;

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
    if(awayIsChecked && roundtripElement.checked) {
        console.log('I am here')
        validateError(returnDate, returnElement )
    } else {
        validateError(false, returnElement )
    }


    let arrivalElement = document.querySelector('#arrival')
    let arrival = arrivalElement.value
    validateError(arrival, arrivalElement)

    let passenger1Element = document.querySelector('#passenger1')
    let passenger1 = passenger1Element.value
    validateError((passenger1.length > 5),passenger1Element )


    let male1Element = document.querySelector('#male1')
    let female1Element = document.querySelector('#female1')
    let gender1 = document.querySelector('#gender1')
    validateError((male1Element.checked || female1Element.checked), gender1)


    let passenger2Element = document.querySelector('#passenger2')
    let passenger2 = passenger1Element.value
    validateError((passenger2.length > 5),passenger2Element )


    let male2Element = document.querySelector('#male2')
    let female2Element = document.querySelector('#female2')
    let gender2 = document.querySelector('#gender2')
    validateError((male2Element.checked || female2Element.checked), gender2)

    let emailElement = document.querySelector('#emailAddress')
    let email = emailElement.value
    validateError(emailValidation.test(email), emailElement)

    let mobileElement = document.querySelector('#mobilePhone')
    let mobile = mobileElement.value
    validateError(phoneValidation.test(mobile), mobileElement)
}
ticketingForm.addEventListener('submit', (e) => {
    e.preventDefault()
})

function validateError(result, element) {
    result ? valid(element) : invalid(element)
}
function invalid(element) {
    element.classList.add("is-invalid");
}
function valid(element) {
    element.classList.remove("is-invalid");
}