document.getElementById('signupForm').addEventListener('submit', function(event) {
    let isValid = true;

    // Validate contact number
    const contactInput = document.getElementById('contact');
    const contactError = document.getElementById('contactError');
    const contactValue = contactInput.value;
    if (!/^\d{10}$/.test(contactValue)) {
        isValid = false;
        contactError.textContent = 'Invalid contact number. It must be exactly 10 digits.';
        contactError.style.display = 'block';
    } else {
        contactError.textContent = '';
        contactError.style.display = 'none';
    }

    // Validate age (Date of Birth)
    const dobInput = document.getElementById('dob');
    const dobError = document.getElementById('dobError');
    const dobValue = new Date(dobInput.value);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dobValue.getFullYear();
    if (age < 8 || (age === 8 && currentDate < new Date(dobValue.setFullYear(dobValue.getFullYear() + 8)))) {
        isValid = false;
        dobError.textContent = 'You are under 8 years old.';
        dobError.style.display = 'block';
    } else {
        dobError.textContent = '';
        dobError.style.display = 'none';
    }

    if (!isValid) {
        event.preventDefault();
    }
});

//backend