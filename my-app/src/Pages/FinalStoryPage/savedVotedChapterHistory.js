import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase"; // adjust path if needed

async function saveVotedChapterHistory(votedChapterHistory) {
  const user = auth.currentUser;
  if (!user) {
    console.error("No user is signed in!");
    return;
  }

  const userDocRef = doc(db, "users", user.uid);

  await setDoc(userDocRef, { votedChapterHistory: votedChapterHistory }, { merge: true });
  console.log("Voted chapter history saved!");
}

export default saveVotedChapterHistory;
