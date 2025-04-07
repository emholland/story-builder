import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase.js"; // Ensure Firestore is imported

const auth = getAuth();

const handleAuthentication = async (email, password, action, navigate, setMessages) => {
  try {
    if (action === "login") {
      // Attempt to log in
      await signInWithEmailAndPassword(auth, email, password);
      const successMessage = "User logged in successfully!";
      console.log(successMessage);
      setMessages((prevMessages) => [prevMessages, { type: "success", message: successMessage }]);
      navigate("/dashboard");
    } else if (action === "create") {
      try {
        // Create a new user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const successMessage = "Account created successfully! Now, Log in!";
        console.log(successMessage);
        setMessages((prevMessages) => [prevMessages, { type: "success", message: successMessage }]);

        // Store user details in Firestore
        const userDocRef = doc(db, "Users", user.uid);
        const userData = {
          user_id: user.uid,
          email: user.email,
        };

        console.log("Saving user data to Firestore:", userData);
        await setDoc(userDocRef, userData); // stores in Firebase
        console.log("User data saved to Firestore");
      } catch (createError) {
        if (createError.code === "auth/email-already-in-use") {
          const errorMessage = "This email is already registered. Please log in instead!";
          console.error(errorMessage);
          setMessages((prevMessages) => [prevMessages, { type: "error", message: errorMessage }]);
        } else {
          const errorMessage = "Error creating account: " + createError.message;
          console.error(errorMessage);
          setMessages((prevMessages) => [prevMessages, { type: "error", message: errorMessage }]);
        }
      }
    }
  } catch (error) {
    const errorMessage = "Authentication error: " + error.message;
    console.error(errorMessage);
    setMessages((prevMessages) => [prevMessages, { type: "error", message: errorMessage }]);
  }
};

export { handleAuthentication };