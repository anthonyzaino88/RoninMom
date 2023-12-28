import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { app } from './firebase-config';

export function signUpUser(email, password, username) {
  const auth = getAuth(app);

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Update the user's profile with their username
      return updateProfile(userCredential.user, {
        displayName: username
      });
    })
    .then(() => {
      // Send an email verification
      const user = auth.currentUser;
      return sendEmailVerification(user);
    })
    .then(() => {
      console.log("Verification email sent");
      // Additional actions after sending verification email
    })
    .catch((error) => {
      console.error("Error in sign up: ", error.message);
      // Handle errors here
    });
}
