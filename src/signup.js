import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { app, db } from './firebase-config';

export async function signUpUser(email, password, username) {
  const auth = getAuth(app);

  try {
    console.log("Starting sign-up process for:", email);

    // Check for username uniqueness
    console.log("Checking if username exists:", username);
    const usernameRef = doc(db, 'usernames', username);
    const usernameSnap = await getDoc(usernameRef);
    console.log("Username existence check completed");
    
    if (usernameSnap.exists()) {
      console.log("Username already taken:", username);
      throw new Error('Username is already taken');
    }
    console.log("Username is available:", username);

    // Create user account
    console.log("Creating user account");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User account created:", userCredential.user.uid);

    // Update user's profile
    console.log("Updating user's profile with display name:", username);
    await updateProfile(userCredential.user, { displayName: username });
    console.log("User profile updated");

    // Store username in Firestore
    console.log("Attempting to store username in Firestore", username);
    await setDoc(doc(db, 'usernames', username), { uid: userCredential.user.uid });
    console.log("Username stored in Firestore:", username);

    // Send email verification
    console.log("Attempting to send email verification");
    await sendEmailVerification(userCredential.user);
    console.log("Verification email sent");

  } catch (error) {
    console.error("Error during sign-up process:", error);
    console.error("Error details:", error.message);
  }
}
