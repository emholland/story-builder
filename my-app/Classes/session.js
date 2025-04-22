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
     console.log("Input to parseOutlineBuildPhases:", winningChapter);
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
    //Make map
    const chaptersMap = new Map();
    this.agents.forEach(async (agent) => {
      console.log(agent.chapter);
      chaptersMap.set(agent.chapter, 0);
    });

    //Put votes into map
    for (const agent of this.agents) {
      let votedChapter = await agent.vote(chaptersMap);
      chaptersMap.set(votedChapter, chaptersMap.get(votedChapter) + 1);
    }

    //Find biggest value in map
    let winningChapter = "";
    let mostVotes = 0;
    for (const [key, value] of chaptersMap) {
      //console.log(key, value);
       console.log(`key: ${key}, value: ${value}`);
      if (value > mostVotes) {
        mostVotes = value;
        winningChapter = key;
        console.log("WINNER IS:", winningChapter)
      }
    }

    if(this.currentChapter === 0){
      this.parseOutlineBuildPhases(winningChapter);
    }

    //Add winning chapter to array

    this.phases[this.currentChapter].setText(winningChapter);
    
    this.story.addChapter(winningChapter);

    this.currentChapter++;

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
  
  