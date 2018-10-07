(function() {

  const addressField = document.querySelector('#address')
  const submitButton = document.querySelector('#submitButton')
  const estimateForm = document.querySelector('#propertyEstimateForm')
  const emailField = document.querySelector('#email')
  
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

  function handleSubmission(evt) {
    evt.preventDefault();
    const isAddressValid = addressField.value.length > 0
    const isFormValid = isAddressValid && isEmailValid;
    
    if (isFormValid) {
      estimateForm.submit()
      return;
    }
    
    // Light up validation errors.
    
  }
  
  autocomplete.setTypes(['address']);
  autocomplete.addListener('place_changed', handleAddressInputAutocomplete);
  addressField.addEventListener('input', handleAddressInputChange)
  emailField.addEventListener('input', handleEmailAddressInputChange);
  submitButton.addEventListener('click', handleSubmission)

})()
