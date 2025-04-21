class User {
    constructor(email, password, userid = null) {
      this.email = email;
      this.password = password;
      this.userid = userid;
    }
  
    // password is not turned to JSON
    toJSON() {
      return {
        email: this.email,
        userid: this.userid,
      };
    }
  
    fromJSON(json) {
      this.email = json.email;
      this.password = json.password;
      this.userid = json.userid;
    }
  }
  
  export default User;
  