import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { app, db } from './firebase-config';

export async function signUpUser(email, password, username) {
  const auth = getAuth(app);

  try {
    console.log("Creating user account with email:", email);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User account created with UID:", userCredential.user.uid);

    console.log("Storing test data in Firestore");
    await setDoc(doc(db, 'TestCollection', 'TestDocument'), { testField: 'testValue' });
    console.log("Test data stored in Firestore");

    console.log("Sending email verification");
    await sendEmailVerification(userCredential.user);
    console.log("Verification email sent");

  } catch (error) {
    console.error("Error during sign-up process:", error);
  }
}
