
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebase-config'; 

export function signUpUser(email, password) {
  const auth = getAuth(app);

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User created: ", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error in sign up: ", errorMessage);
    });
}




document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    
    if (signupForm) {
      signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
  
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
  
        signUpUser(email, password);
      });
    }
  });
  
