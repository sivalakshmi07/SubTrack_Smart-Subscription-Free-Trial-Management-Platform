// Register page: client-side checks only (backend connection comes later)

const form = document.getElementById('registerForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');
const formMessage = document.getElementById('formMessage');

// Show or hide an error under a field
function setError(input, message) {
  const errorBox = document.getElementById(input.id + 'Error');
  errorBox.textContent = message;
  input.classList.toggle('is-invalid', message !== '');
}

// Individual checks. Each returns an error message, or '' if the value is fine.
function checkName() {
  const value = nameInput.value.trim();
  if (value.length < 2) return 'Please enter your full name.';
  return '';
}

function checkEmail() {
  const value = emailInput.value.trim();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value === '') return 'Email is required.';
  if (!pattern.test(value)) return 'Please enter a valid email address.';
  return '';
}

function checkPassword() {
  const value = passwordInput.value;
  if (value.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) {
    return 'Password must contain both letters and numbers.';
  }
  return '';
}

function checkConfirm() {
  if (confirmInput.value === '') return 'Please confirm your password.';
  if (confirmInput.value !== passwordInput.value) return 'Passwords do not match.';
  return '';
}

// Password strength meter
function updateStrength() {
  const value = passwordInput.value;
  let score = 0;
  if (value.length >= 8) score++;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;

  const levels = [
    { width: '0%',   color: '#dc3545', text: 'Use 8+ characters with letters and numbers.' },
    { width: '25%',  color: '#dc3545', text: 'Weak' },
    { width: '50%',  color: '#fd7e14', text: 'Fair' },
    { width: '75%',  color: '#9ab83a', text: 'Good' },
    { width: '100%', color: '#4a762a', text: 'Strong' }
  ];
  const level = value === '' ? levels[0] : levels[score];
  strengthBar.style.width = level.width;
  strengthBar.style.backgroundColor = level.color;
  strengthText.textContent = level.text;
}

// Live feedback while typing
nameInput.addEventListener('input', () => setError(nameInput, checkName()));
emailInput.addEventListener('input', () => setError(emailInput, checkEmail()));
passwordInput.addEventListener('input', () => {
  updateStrength();
  setError(passwordInput, checkPassword());
  if (confirmInput.value !== '') setError(confirmInput, checkConfirm());
});
confirmInput.addEventListener('input', () => setError(confirmInput, checkConfirm()));

// Show / Hide password buttons
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

  const errors = {
    name: checkName(),
    email: checkEmail(),
    password: checkPassword(),
    confirm: checkConfirm()
  };
  setError(nameInput, errors.name);
  setError(emailInput, errors.email);
  setError(passwordInput, errors.password);
  setError(confirmInput, errors.confirm);

  const hasErrors = Object.values(errors).some((message) => message !== '');
  if (hasErrors) return;

  // Backend will be connected here later (POST /api/auth/register)
  formMessage.className = 'alert alert-success';
  formMessage.textContent = 'Form looks good! (Backend will be connected later.)';
});