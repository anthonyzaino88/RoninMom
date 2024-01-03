// Import Firebase configuration and necessary functions
import './firebase-config';
import { signInWithEmailAndPassword, getIdTokenResult } from 'firebase/auth';
import { signUpUser } from './signup';

// Function to setup the signup form listener
function setupSignupForm() {
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      const username = document.getElementById('signup-username').value;
      signUpUser(email, password, username);
    });
  }
}

// Function to setup the admin login form listener
function setupAdminLoginForm() {
  const adminLoginForm = document.getElementById('adminLoginForm');
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', async function(event){
      event.preventDefault();
      const email = document.getElementById('adminEmail').value;
      const password = document.getElementById('adminPassword').value;

      try {
          const userCredential = await signInWithEmailAndPassword(email, password);
          const idTokenResult = await getIdTokenResult(userCredential.user);
          if (idTokenResult.claims.admin) {
              window.location.href = '/path-to-admin-dashboard.html';
          } else {
              console.error('Access denied. User is not an admin.');
          }
      } catch (error) {
          console.error('Login failed:', error);
      }
    });
  }
}

// Initialize the forms when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  setupSignupForm();
  setupAdminLoginForm();
});
