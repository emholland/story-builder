import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "./firebaseConfig"; // Ensure Firestore is imported

const auth = getAuth();
const navigate = useNavigate();

const handleAuthentication = async (email, password, username, action) => {
  try {
    if (action === "login") {
      // Attempt to log in
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully!");
      navigate("/dashboard");
    } else if (action === "create") {
      try {
        // Try signing in first (auto-login returning users)
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User already exists, logging in...");
        navigate("/dashboard");
      } catch (signInError) {
        // If user does not exist, create a new account
        if (signInError.code === "auth/user-not-found") {
          try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("Account created successfully!");

            // Store user details in Firestore
            await setDoc(doc(db, "Users", user.uid), {
              user_id: user.uid,
              username: username, // Placeholder, replace with actual user input
            });
            
            console.log("User data saved to Firestore");
            navigate("/dashboard");
          } catch (createError) {
            console.error("Error creating account:", createError);
          }
        } else {
          console.error("Sign-in error:", signInError);
        }
      }
    }
  } catch (error) {
    console.error("Authentication error:", error);
  }
};

export { handleAuthentication };
