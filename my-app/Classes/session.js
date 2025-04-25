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
      const votedChapter = await agent.vote(chaptersMap);
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


    // Call follow-up logic
    if (this.currentChapter === 0) {
      this.parseOutlineBuildPhases(winningChapter);
    }
  
    this.phases[this.currentChapter].setText(winningChapter);
    this.story.addChapter(winningChapter);
    this.currentChapter++;
  
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
}

  
  export default Session;
  
  