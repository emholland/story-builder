import Agent from "./Agent.js"
import Story from "./Story.js"
import Phase from "./Phase.js"


class Session {
    // Constructor
    constructor(title, user, prompt, agents = [], numberOfChapters) {
      this.user = user;
      this.title = title;
      this.story = new Story(numberOfChapters);
      this.prompt = prompt;
      this.numberOfChapters = numberOfChapters; 
      this.currentChapter = 0;
      this.agents = agents;
      this.winningAgents = [];
      this.phases = [];
      for(let i=0; i<=numberOfChapters; i++){
        const nPhase = new Phase(i);
        console.log(i, nPhase)
        this.phases.push(nPhase);
      }
      
      this.story;
      this.debateTranscript = "";
      this.outline = "";
      // ...
    }
  
  
  
    parseOutlineBuildPhases(outline) {
      if (!outline || typeof outline !== 'string') return [];
      console.log(outline);
  
      // Try to split based on common outline patterns
     const split = outline.split("**");

     const title = split[0];
     console.log(title);

     let phaseIndex = 1;

     for(let i = 3; i<=(this.numberOfChapters*3); i+=2){
     console.log("Input to parseOutlineBuildPhases:", outline);
      this.phases[phaseIndex].setTitle(split[i]);
      console.log(title);
      phaseIndex++;
    }

    phaseIndex = 1;
     
     for(let i = 4; i<=(this.numberOfChapters*3); i+=2){
      this.phases[phaseIndex].setOutlineSnippet(split[i]);
      console.log(title);
      phaseIndex++;
    }
     
  
      return this.phases;
    }
    

    // Getters
  getStory() {
    return this.story;
  }

  getPrompt() {
    return this.prompt;
  }

  getAgents() {
    return this.agents;
  }


  async fakeVote() {
    console.log(this.debateTranscript);
    const chaptersMap = new Map();
  
    // Build initial vote map
    for (const agent of this.agents) {
      if (agent.chapter) {
        chaptersMap.set(agent.chapter, 0);
      } else {
        console.warn(`${agent.persona} has no chapter`);
      }
    }
  
    // Have each agent vote
    for (const agent of this.agents) {
      const votedChapter = await agent.vote(chaptersMap, this.debateTranscript);
      if (!votedChapter || !chaptersMap.has(votedChapter)) {
        console.warn(`Invalid vote from ${agent.persona}`);
        continue;
      }
      chaptersMap.set(votedChapter, chaptersMap.get(votedChapter) + 1);
    }
  
    // Determine winner
    let winningChapter = "";
    let mostVotes = 0;
  
    for (const [chapter, votes] of chaptersMap) {
      console.log(`key: ${chapter}, value: ${votes}`);
      if (votes > mostVotes) {
        mostVotes = votes;
        winningChapter = chapter;
      }
    }
  
    console.log(" WINNING CHAPTER IS:", winningChapter);
  
    if (!winningChapter) {
      throw new Error("No winning chapter selected. All votes may have failed.");
    }

    // Find winning agent
    for (const agent of this.agents) {
      if (agent.chapter == winningChapter) {
        this.winningAgents.push(agent);
      }
    }
    


    if (this.currentChapter === 0) {
      this.outline= winningChapter;
    }


    // Store voted Chapters
    for (const agent of this.agents) {
      agent.addVotedChapter(winningChapter);
    }
  
    this.phases[this.currentChapter].setText(winningChapter);
    this.story.addChapter(winningChapter);
    this.currentChapter++;

    this.debateTranscript = "";
  
    return winningChapter;
  }
  
  // Serialization
  toJSON() {
    return {
      user: this.user,
      story: this.story,
      prompt: this.prompt,
      numberOfChapters: this.numberOfChapters,
      currentChapter: this.currentChapter,
      createdAt: this.createdAt,
      agents: this.agents.map(agent => ({
        persona: agent.persona,
        aiInstance: agent.aiInstance,
        chapterHistory: agent.chapterHistory,
      })),
    };
  }

  // Deserialization
  fromJSON(json) {
    this.user = json.user;
    this.story = json.story;
    this.prompt = json.prompt;
    this.numberOfChapters = json.numberOfChapters;
    this.currentChapter = json.currentChapter;
    this.createdAt = json.createdAt;

    this.agents = json.agents.map(agentData => {
      const agent = new Agent(agentData.persona, agentData.aiInstance);
      agent.chapterHistory = agentData.chapterHistory;
      return agent;
    });
  }

  async debate(proposalIndex = null) {
    const proposals = this.agents.map(agent => agent.chapter);
    const indexes = proposalIndex !== null ? [proposalIndex] : proposals.map((_, i) => i);
    const fullTranscriptParts = [];
  
    for (let pIndex of indexes) {
      const currentProposal = proposals[pIndex];
      const priorResponses = [];
      const agentLines = [];
  
      for (let aIndex = 0; aIndex < this.agents.length; aIndex++) {
        const agent = this.agents[aIndex];
  
        const debateSoFar = priorResponses
          .map((r, i) => `Agent ${this.agents[i].persona} said:\n${r}`)
          .join("\n\n");
  
        // 🔁 Use agent's method now
        const response = await agent.debateProposal(currentProposal, debateSoFar);
        agent.debateResponse = response;
  
        priorResponses.push(response);
        agentLines.push(`Agent ${agent.persona}:\n${response}`);
      }
  
      const proposalTranscript = `### Proposal ${pIndex + 1} Debate\n\n${agentLines.join("\n\n")}`;
      fullTranscriptParts.push(proposalTranscript);
    }
  
    // ✅ Only set debateTranscript once after all proposals
    const newTranscript = fullTranscriptParts.join("\n\n---\n\n");

    this.debateTranscript = (this.debateTranscript || "") + "\n\n" + newTranscript;

  
    return this.debateTranscript;
  }  
}

  export default Session;
  
  