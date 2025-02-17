```mermaid
---
title: Backend Class Diagram 
---

classDiagram
    User "1" *-- "1..*" Session
    User --> Login
    Session o-- Story
    Session *-- Agent
    Session *-- VotePhase

    class Session{
        + Array agents[]
        + User user 
        + Story story
        + Phase phase
        + String guidelines

        + createStory()
        + addAgentToArray()
        + removeAgentFromArray()
        + moveToNextPhase()
        + reset()
        + setGuidelines()
    }

    class Story{
        + String guidelines 
        + Array chapters[]
        + Boolean isComplete
        + Int length

        + addChapter(String chapter)
        + getStory() : String story
        + completeStory()
    
    }

    class Agent{
      + String persona
      + String chapter 
      + String aiInstance 

      + generateChapter()
      + analyseAndVote()
      + sendVote()
      + setPersona()
      + adaptToNewChapter()
    }

    class User{
        +String username 
        +String password 

        + editChapter() 
        + vetoChapter() 
        + moveToNextPhase() 
        + assignGuidlines(String guidelines)

    }

    class VotePhase{
        + Array agents[]
        + Array chapters[]
        + Array votes[] 

        + rest()
        + countVotes(): Array

    }

    class Login{
        +String username 
        +String password 

        +validate(String username, String password): boolean
    }
    ```
![Table Description](/img/table-des.jpeg)
