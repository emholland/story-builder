// method for counting votes 
// fetches and posts votes to firebase
// Voting.js
import { db } from "../firebaseConfig.js"; // Assume you've initialized Firebase Admin SDK
import { collection, addDoc, getDocs, doc, updateDoc, increment } from "firebase/firestore";

class Voting {
  constructor(agents, storyId, chapterMap) {
    this.agents = agents; 
    this.storyId = storyId; 
    this.chapterMap = chapterMap; // { agentName: chapterContent }
  }

  async promptAgentsToVote() {
    const votes = [];

    for (const agent of this.agents) {
      const votedFor = await agent.analyseAndVote(this.chapterMap); // Assume chapterMap is passed to allow evaluation
      console.log(`${agent.persona} voted for ${votedFor}`);
      votes.push({ voterAgent: agent.persona, votedFor });
    }

    return votes;
  }

  async castVotesToFirebase(votes) {
    for (const vote of votes) {
      const voteRef = collection(db, "Stories", this.storyId, "Votes");

      // Create a new vote document
      await addDoc(voteRef, {
        voterAgent: vote.voterAgent,
        votedFor: vote.votedFor,
        timestamp: Date.now(),
      });

      // Also update the vote count in the respective chapter
      const chaptersRef = doc(db, "Stories", this.storyId, "Chapters", vote.votedFor);
      await updateDoc(chaptersRef, {
        voteCount: increment(1),
      });
    }
  }

  async tallyVotesFromFirebase() {
    const votesRef = collection(db, "Stories", this.storyId, "Votes");
    const snapshot = await getDocs(votesRef);

    const voteTally = {};
    snapshot.forEach(doc => {
      const { votedFor } = doc.data();
      voteTally[votedFor] = (voteTally[votedFor] || 0) + 1;
    });

    return voteTally;
  }

  async selectWinningChapter() {
    const tally = await this.tallyVotesFromFirebase();

    let maxVotes = 0;
    let winningChapterId = null;

    for (const [chapterId, count] of Object.entries(tally)) {
      if (count > maxVotes) {
        maxVotes = count;
        winningChapterId = chapterId;
      }
    }

    const winningAgent = Object.keys(this.chapterMap).find(agent =>
      this.chapterMap[agent] === winningChapterId
    );

    return {
      winningChapterId,
      winningAgent,
      voteCount: maxVotes,
    };
  }
}

export default Voting;
