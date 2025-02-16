function validatePasswords() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const passwordError = document.getElementById('passwordError');
    
    if (password !== confirmPassword) {
        passwordError.textContent = 'Passwords do not match. Please try again.';
        passwordError.style.display = 'block';
        return false;
    } else {
        passwordError.style.display = 'none';
    }
    return true;
}

function togglePasswordVisibility(inputId, eyeIconId) {
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = document.querySelector(`span[onclick*="${inputId}"]`);
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.textContent = '🙈'; // Closed eye icon
    } else {
        passwordInput.type = 'password';
        eyeIcon.textContent = '👁️'; // Open eye icon
    }
}