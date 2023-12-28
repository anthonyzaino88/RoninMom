import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { app, db } from './firebase-config'; // Assuming db is your Firestore instance

export async function signUpUser(email, password, username) {
  const auth = getAuth(app);

  try {
    // Check if the username is already taken
    const usernameRef = doc(db, 'usernames', username);
    const usernameSnap = await getDoc(usernameRef);

    if (usernameSnap.exists()) {
      throw new Error('Username is already taken');
    }

    // Proceed with user creation if username is not taken
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);


       // Update the user's profile with their display name (username)
       await updateProfile(userCredential.user, {
        displayName: username
      });

    const uid = userCredential.user.uid;

    // Store the username in Firestore
    // Store the username with the username as the document ID
    await setDoc(doc(db, 'usernames', username), { uid: userCredential.user.uid });


    // Send email verification
    await sendEmailVerification(userCredential.user);
    console.log("Verification email sent");
    // Additional actions after successful registration
  } catch (error) {
    console.error("Error in sign up: ", error.message);
    // Handle errors here, such as displaying a message to the user
  }
}
