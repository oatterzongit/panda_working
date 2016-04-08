document.addEventListener('DOMContentLoaded', function(evt) {

  // Get the modal
  var loginModal = document.getElementById('login-modal');
  var signUpModal = document.getElementById('signup-modal');

  // Get the button that opens the modal
  var loginBtn = document.getElementById("login-modal-btn");
  var signUpBtn = document.getElementById("signup-modal-btn");

  // Get the <span> element that closes the modal
  var closeLogin   = document.getElementById("login-close");
  var submitLogin  = document.getElementById("login-submit");
  var closeSignUp  = document.getElementById("signup-close");
  var submitSignUp = document.getElementById("signup-submit");

  // When the user clicks on the button, open the modal
  loginBtn.onclick = function() {
      loginModal.style.display = "block";
  }

  // When the user clicks on the button, open the modal
  signUpBtn.onclick = function() {
      signUpModal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  closeLogin.onclick = function() {
      loginModal.style.display = "none";
  }

  // When the user clicks on <span> (x), close the modal
  closeSignUp.onclick = function() {
      signUpModal.style.display = "none";
  }

  // When the user clicks on <id submit> (x), close the modal
  submitLogin.onclick = function() {
      loginModal.style.display = "none";
  }

  // When the user clicks on <id submit> (x), close the modal
  submitSignUp.onclick = function() {
      signUpModal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == loginModal) {
          loginModal.style.display = "none";
      }
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == signUpModal) {
          signUpModal.style.display = "none";
      }
  }

});
