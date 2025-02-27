---
title: Features and Requirements
sidebar_position: 4
---

# Features and Requirements

## Functional Requirements

* When opening the application, the user will see a screen asking them to enter an email and a password. The email and password will be saved to a database. The user can login again later with their credentials. Their session is saved. The user must login to use the service. 
* After logging in, the user is directed to a new page where there are options to create a new story or read previous ones.
* If the user selects create a new story, they will be directed to a new page where they can select AI agents that will be used to write a story. Each agent will have a brief description of their writing style.
* After agents are selected, the user will be asked to prompt the agents with key details of the story in a text box. 
*	The agents can write stories based on the prompt and in their own style. Only one chapter is written at a time. After a chapter is written, a voting process begins. 
*	The agents vote on which agent’s chapter they like the most. Each agent gets one vote and cannot vote for their own chapter. 
*	After the agents vote, the user can view which chapter received the most votes. The user can veto or accept the chosen chapter. If the user vetos, then they will pick a different chapter. 
* The user will then have the option to give critiques on the chosen chapter. If they choose not to give critiques, the chapter will be added to the story. If they choose to give critiques, they will be able to enter the critique in a text box that will be sent to the agents.
*	If critiques are given then the agents will rewrite the critiqued chapter and the voting process will happen again. 
*	After a chapter is added, the user can decide to end the story or have the agents write another chapter.
*	If the story is ended, the user will be brought back to the screen where they can create a new story or read previous ones. The completed story is able to be accessed on the page where the user can read completed stories. 
* If the user selects the read previous stories option then they will be able to see all of their completed stories and can select one to read.
* If the user selects a story to read, then they will be shown the first page of the story. They can go forward or backward by clicking the next page or previous page options.
* The user can leave read mode by clicking the exit button. They will then be brought back to the page where they can select to read completed stories or create a new story. 


- ***add more Function Requirements***
- ***describe what each functional requirement does in detail***
- ***EXAMPLE: User must login...***
  - ***does the login interface have anything different?***
  - ***is their session saved?***
  - ***this is the specfics needed that I mentioned earlier***

## Non-Functional Requirements

*	Has at least three AI agents that can write stories.
*	The chapter process can be repeated for at least ten chapters.
*	The agents can write a chapter in under one minute.
*	At least five previously completed stories can be stored on an account.

