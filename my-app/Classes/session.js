import Agent from "./Agent.js"
import Story from "./Story.js"


class Session {
    // Constructor
    constructor(user, prompt, agents = [], numberOfChapters) {
      this.user = user;
      this.story = new Story(numberOfChapters);
      this.prompt = prompt;
      this.numberOfChapters = numberOfChapters; 
      this.currentChapter = 0;
      this.agents = agents;

      this.story;
      // ...
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

  fakeVote() {
      const randomIndex = Math.floor(Math.random() * this.agents.length);
      const winningChapter = this.agents[randomIndex].chapterHistory[this.currentChapter];
    
      if(this.currentChapter == 0){
        this.story.outline = winningChapter;
      }else{
        this.story.addChapter(winningChapter)
      }
      this.currentChapter++;
    
      console.log("Fake vote selected:", winningChapter);
      return winningChapter;
  };

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
  
  