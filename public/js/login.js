// Login page: client-side checks only (backend connection comes later)

const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const formMessage = document.getElementById('formMessage');

// Show or hide an error under a field
function setError(input, message) {
  const errorBox = document.getElementById(input.id + 'Error');
  errorBox.textContent = message;
  input.classList.toggle('is-invalid', message !== '');
}

function checkEmail() {
  const value = emailInput.value.trim();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value === '') return 'Email is required.';
  if (!pattern.test(value)) return 'Please enter a valid email address.';
  return '';
}

function checkPassword() {
  if (passwordInput.value === '') return 'Password is required.';
  return '';
}

// Clear the error as soon as the user starts fixing a field
emailInput.addEventListener('input', () => setError(emailInput, checkEmail()));
passwordInput.addEventListener('input', () => setError(passwordInput, checkPassword()));

// Show / Hide password button
document.querySelectorAll('.toggle-password').forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.target);
    const hidden = target.type === 'password';
    target.type = hidden ? 'text' : 'password';
    button.textContent = hidden ? 'Hide' : 'Show';
  });
});

// On submit
form.addEventListener('submit', (event) => {
  event.preventDefault(); // stop the page from reloading

  const emailError = checkEmail();
  const passwordError = checkPassword();
  setError(emailInput, emailError);
  setError(passwordInput, passwordError);

  if (emailError !== '' || passwordError !== '') {
    formMessage.className = 'alert d-none';
    return;
  }

  // Backend will be connected here later (POST /api/auth/login)
  formMessage.className = 'alert alert-success';
  formMessage.textContent = 'Form looks good! (Backend will be connected later.)';
});