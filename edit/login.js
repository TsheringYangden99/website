// Function for Login
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const encryptedPassword = btoa(password); // Basic encryption for demo purposes

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === encryptedPassword);

    if (user) {
        document.getElementById('loginMessage').textContent = 'Login successful!';

        // Redirect to home page after a short delay
        setTimeout(() => {
            window.location.href = 'index.html'; // Change this to your home page URL
        }, 1000); // Adjust the delay (in milliseconds) if needed
    } else {
        document.getElementById('loginMessage').textContent = 'Invalid username or password.';
    }
});
