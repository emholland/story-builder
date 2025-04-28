class Phase {
    constructor(number) {
      this.number = number;
      this.title;
      this.winner;
      this.outlineSnippet;
      this.text;
    }

    setTitle(title){
        this.title=title;
    }

    setOutlineSnippet(snippet){
        this.outlineSnippet= snippet;
    }

    setWinner(winner){
        this.winner = winner;
    }

    setText(text){
      this.text = text;
  }
  
    toJSON() {
      return {
        number: this.number,
        title: this.title,
        winner: this.winner,
        outlineSnippet: this.outlineSnippet,
        text: this.text,
      };
    }
  
    static fromJSON(json) {
      const phase = new Phase(json.number);
      phase.setTitle(json.title);
      phase.setWinner(json.winner);
      phase.setOutlineSnippet(json.outlineSnippet);
      phase.setText(json.text);
      return phase;
    }
  }
  
  export default Phase;