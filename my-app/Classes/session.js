class Session {
    // Constructor
    constructor(user, story, prompt) {
      this.user = user;
      this.story = story;
      this.prompt;
      this.numberOfChapters; 
      this.currentChapters = [];
      this.agents = [];
      // ...
    }
  
    //Create Agent with API link
    createAgent() {
  
      
    }

    //add agent to list of agents
    addAgent(agent){
      this.agents.push(agent);
    }
  
    method2(parameter) {
      // Code for method2
    }
  
    // Static method
    static staticMethod() {
      // Code for static method
    }
  }
  