
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




