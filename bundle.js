(function() {

  const addressField = document.querySelector('#address')
  const submitButton = document.querySelector('#submitButton')
  const estimateForm = document.querySelector('#propertyEstimateForm')
  const emailField = document.querySelector('#email')
  const requestForm = document.querySelector('#requestForm')

  let isEmailValid;

  autocomplete = new google.maps.places.Autocomplete(addressField);
  
  function handleAddressInputAutocomplete() {
    const placeData = autocomplete.getPlace();
    submitButton.disabled = false;
  }
  
  function handleAddressInputChange(evt) {
    submitButton.disabled = true;
  }
  
  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function handleEmailAddressInputChange(evt) {
    const value = evt.target.value;
    isEmailValid = validateEmail(value);
    if (addressField.value.length > 0) {
      submitButton.disabled = false;
    }
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
    evt.preventDefault();
    const isAddressValid = addressField.value.length > 0
    const isFormValid = isAddressValid && isEmailValid;
    const postData = JSON.stringify({
      [addressField.name]: addressField.value,
      [emailField.name]: emailField.value,
    })

    if (isFormValid) {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/estimate-request", true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(postData);
      xhr.onload = function() {
        const isValid = this.responseText === 'OK' && this.status === 200
        showMessage(isValid)
      }
    }
    
    // Light up validation errors.
    
  }
  
  autocomplete.setTypes(['address']);
  autocomplete.addListener('place_changed', handleAddressInputAutocomplete);
  addressField.addEventListener('input', handleAddressInputChange)
  emailField.addEventListener('input', handleEmailAddressInputChange);
  submitButton.addEventListener('click', handleSubmission)

})()
