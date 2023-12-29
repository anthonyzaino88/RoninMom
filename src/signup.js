import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { app, db } from './firebase-config';

export async function signUpUser(email, password, username) {
  const auth = getAuth(app);

  try {
    console.log("Creating user account with email:", email);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    console.log("User account created with UID:", uid);

    console.log("Updating user's profile with display name:", username);
    await updateProfile(userCredential.user, { displayName: username });
    console.log("User profile updated");

    console.log("Storing user data in Firestore under 'Users' collection");
    await setDoc(doc(db, 'Users', uid), { username: username, email: email });
    console.log("User data stored in Firestore:", uid);

    console.log("Sending email verification");
    await sendEmailVerification(userCredential.user);
    console.log("Verification email sent");

  } catch (error) {
    console.error("Error during sign-up process:", error);
  }
}
