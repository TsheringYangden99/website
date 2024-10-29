// Function for Sign Up
document.getElementById('signUpForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Password validation conditions
    const passwordConditions = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/; // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character

    if (password !== confirmPassword) {
        document.getElementById('signUpMessage').textContent = 'Passwords do not match.';
        return;
    }

    if (!passwordConditions.test(password)) {
        document.getElementById('signUpMessage').textContent = 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
        return;
    }

    // Encrypt password
    const encryptedPassword = btoa(password); // Basic encryption for demo purposes

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, email, password: encryptedPassword });
    localStorage.setItem('users', JSON.stringify(users));

    document.getElementById('signUpMessage').textContent = 'Account created successfully!';
    this.reset();
});
