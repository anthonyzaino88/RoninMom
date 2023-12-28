import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { app, db } from './firebase-config'; // Assuming db is your Firestore instance

export async function signUpUser(email, password, username) {
  const auth = getAuth(app);

  try {
    console.log("Checking if username exists:", username);
    const usernameRef = doc(db, 'usernames', username);
    const usernameSnap = await getDoc(usernameRef);

    if (usernameSnap.exists()) {
      console.log("Username already taken:", username);
      throw new Error('Username is already taken');
    }
    console.log("Username is available:", username);

    console.log("Creating user account with email:", email);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User account created:", userCredential.user.uid);

    console.log("Updating user's profile with display name:", username);
    await updateProfile(userCredential.user, { displayName: username });
    console.log("User profile updated with display name");

    console.log("Storing username in Firestore", username);
    await setDoc(doc(db, 'usernames', username), { uid: userCredential.user.uid });
    console.log("Username saved in Firestore:", username);

    console.log("Sending email verification");
    await sendEmailVerification(userCredential.user);
    console.log("Verification email sent");
  } catch (error) {
    console.error("Error during sign up: ", error);
  }
}
