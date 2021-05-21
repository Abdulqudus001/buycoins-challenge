const form = document.querySelector('#login-form');
const error = document.querySelector('.form-error');

/**
 * 
 * @param {String} msg Message to display in error box
 */
const showFormError = (msg) => {
  error.style.display = 'block';
  error.textContent = msg;
}

const hideError = () => {
  error.style.display = 'none';
}

const handleLogin = (e) => {
  e.preventDefault();
  const username = document.querySelector('#username');
  if (!username.value) {
    showFormError('You have to provide a username');
  } else {
    console.log(username.value);
  }
  console.log(e);
}

form.addEventListener('submit', handleLogin);