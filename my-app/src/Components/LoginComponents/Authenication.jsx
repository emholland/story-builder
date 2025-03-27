import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase.js"; // Ensure Firestore is imported

const auth = getAuth();

const handleAuthentication = async (email, password, action, navigate) => {
  try {
    if (action === "login") {
      // Attempt to log in
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully!");
      navigate("/dashboard");
    } else if (action === "create") {
      try {
        // Create a new user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Account created successfully!");

        // Store user details in Firestore
        const userDocRef = doc(db, "Users", user.uid);
        const userData = {
          user_id: user.uid,
          email: user.email,
        };
        
        console.log("Saving user data to Firestore:", userData);
        await setDoc(userDocRef, userData);                       // stores in in firebase
        console.log("User data saved to Firestore");
      } catch (createError) {
        if (createError.code === "auth/email-already-in-use") {
          console.error("This email is already registered. Please log in instead!");
        } else {
          console.error("Error creating account:", createError);
        }
      }
    }
  } catch (error) {
    console.error("Authentication error:", error);
  }
};

export { handleAuthentication };
