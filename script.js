
        // Get form elements
        const form = document.getElementById('registrationForm');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const submitBtn = document.getElementById('submitBtn');

        // Get error message elements
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');

        // Get validation indicators
        const nameIndicator = document.getElementById('nameIndicator');
        const emailIndicator = document.getElementById('emailIndicator');
        const passwordIndicator = document.getElementById('passwordIndicator');

        // Validation states
        let validationState = {
            name: false,
            email: false,
            password: false
        };

        // Email regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validation functions
        function validateName() {
            const name = nameInput.value.trim();
            
            if (name === '') {
                showError(nameError, 'Name field cannot be empty');
                setFieldState(nameInput, nameIndicator, false);
                validationState.name = false;
            } else {
                hideError(nameError);
                setFieldState(nameInput, nameIndicator, true);
                validationState.name = true;
            }
            
            updateSubmitButton();
        }

        function validateEmail() {
            const email = emailInput.value.trim();
            
            if (email === '') {
                showError(emailError, 'Email field cannot be empty');
                setFieldState(emailInput, emailIndicator, false);
                validationState.email = false;
            } else if (!emailPattern.test(email)) {
                showError(emailError, 'Please enter a valid email address');
                setFieldState(emailInput, emailIndicator, false);
                validationState.email = false;
            } else {
                hideError(emailError);
                setFieldState(emailInput, emailIndicator, true);
                validationState.email = true;
            }
            
            updateSubmitButton();
        }

        function validatePassword() {
            const password = passwordInput.value;
            
            if (password.length === 0) {
                showError(passwordError, 'Password field cannot be empty');
                setFieldState(passwordInput, passwordIndicator, false);
                validationState.password = false;
            } else if (password.length < 6) {
                showError(passwordError, 'Password must be at least 6 characters long');
                setFieldState(passwordInput, passwordIndicator, false);
                validationState.password = false;
            } else {
                hideError(passwordError);
                setFieldState(passwordInput, passwordIndicator, true);
                validationState.password = true;
            }
            
            updateSubmitButton();
        }

        // Helper functions
        function showError(errorElement, message) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }

        function hideError(errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }

        function setFieldState(input, indicator, isValid) {
            if (isValid) {
                input.classList.remove('invalid');
                input.classList.add('valid');
                indicator.textContent = '✓';
                indicator.className = 'validation-indicator show valid';
            } else {
                input.classList.remove('valid');
                input.classList.add('invalid');
                indicator.textContent = '✗';
                indicator.className = 'validation-indicator show invalid';
            }
        }

        function updateSubmitButton() {
            const allValid = validationState.name && validationState.email && validationState.password;
            submitBtn.disabled = !allValid;
        }

        // Event listeners for real-time validation
        nameInput.addEventListener('input', validateName);
        nameInput.addEventListener('blur', validateName);

        emailInput.addEventListener('input', validateEmail);
        emailInput.addEventListener('blur', validateEmail);

        passwordInput.addEventListener('input', validatePassword);
        passwordInput.addEventListener('blur', validatePassword);

        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Final validation
            validateName();
            validateEmail();
            validatePassword();
            
            // Check if all fields are valid
            if (validationState.name && validationState.email && validationState.password) {
                // Show success message
                document.getElementById('successMessage').style.display = 'block';
                
                // Reset form after successful submission
                setTimeout(() => {
                    form.reset();
                    document.getElementById('successMessage').style.display = 'none';
                    
                    // Reset validation states
                    validationState = { name: false, email: false, password: false };
                    
                    // Reset field styles
                    [nameInput, emailInput, passwordInput].forEach(input => {
                        input.classList.remove('valid', 'invalid');
                    });
                    
                    // Hide indicators
                    [nameIndicator, emailIndicator, passwordIndicator].forEach(indicator => {
                        indicator.classList.remove('show');
                    });
                    
                    // Hide any remaining error messages
                    [nameError, emailError, passwordError].forEach(hideError);
                    
                    updateSubmitButton();
                }, 2000);
            }
        });

        // Initial state - disable submit button
        updateSubmitButton();
    