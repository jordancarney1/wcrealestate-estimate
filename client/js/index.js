(function() {

  const addressField = document.querySelector('#address')
  const submitButton = document.querySelector('#submitButton')
  const emailField = document.querySelector('#email')
  const requestForm = document.querySelector('#requestForm')

  let addressIsValid
  let emailIsValid

  const autocomplete = new google.maps.places.Autocomplete(addressField)
  
  function handleAddressInputAutocomplete() {
    const placeData = autocomplete.getPlace()
    submitButton.disabled = false
  }
  
  function handleAddressInputChange(evt) {
    const value = evt.target.value
    addressIsValid = value.length > 0
    updateSubmitButton()
  }
  
  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  function handleEmailAddressInputChange(evt) {
    const value = evt.target.value
    emailIsValid = validateEmail(value)
    updateSubmitButton()
  }

  function updateSubmitButton() {
    if (emailIsValid && addressIsValid) {
      enableSubmitButton()
    } else {
      disableSubmitButton()
    }
  }

  function disableSubmitButton() {
    submitButton.disabled = true
    submitButton.classList.add('disabled')
  }

  function enableSubmitButton() {
    submitButton.disabled = false
    submitButton.classList.remove('disabled')
  }

  function showMessage(isSuccess) {
    const successHTML = '<h1>Success!</h1>\
      <p>Your home\'s estimate has been sent and will arrive in your email inbox shortly.</p>'
    const failHTML = '<h1>Uh oh...</h1>\
      <p>It looks like something went wrong, please try again.</p>'
    const div = document.createElement('div')
    div.innerHTML = isSuccess ? successHTML : failHTML
    requestForm.innerHTML = ""
    requestForm.appendChild(div)
  }

  function handleSubmission(evt) {
    evt.preventDefault()
    const isFormValid = addressIsValid && emailIsValid
    const postData = JSON.stringify({
      [addressField.name]: addressField.value,
      [emailField.name]: emailField.value,
    })

    if (isFormValid) {
      const xhr = new XMLHttpRequest()
      xhr.open("POST", "/estimate-request", true)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.send(postData)
      xhr.onload = function() {
        const isValid = this.status === 200
        showMessage(isValid)
      }
    }    
  }
  
  autocomplete.setTypes(['address'])
  autocomplete.addListener('place_changed', handleAddressInputAutocomplete)
  addressField.addEventListener('input', handleAddressInputChange)
  emailField.addEventListener('input', handleEmailAddressInputChange)
  submitButton.addEventListener('click', handleSubmission)

})()
