// Import Firebase configuration
import './firebase-config';

// Import your sign-up functionality
import { signUpUser } from './signup';

// Event listener for the form submission
document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');
  
  if (signupForm) {
    signupForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const username = document.getElementById('signup-username').value; // Assuming you have an input field for username
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;

      signUpUser(email, password, username);
    });
  }
});
