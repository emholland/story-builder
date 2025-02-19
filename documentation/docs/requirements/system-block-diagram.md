---
title: System Block Diagram
sidebar_position: 2
---

# System Block Diagram

![View the System Block Diagram](/img/SystemBlockDiagram.jpg)

**Figure 1.1** The StoryBuilder system implements a client-server model. Figure 1 demonstrates the system at a higher level. It is composed of smaller blocks: User, Frontend, Backend, Agents, OpenAI API, and a Firebase database. The User interacts with the frontend client/webpage, where they will configure and mold a story to their liking. The client will communicate with a backend server. The server manages both a database and a connection to the AI agents. The AI agents will utilize both the database and communications with the OpenAI API, which generates content via requests, to update their context (what their current state of information is) and to generate information for the story and story building process. 

## Description of Each Block

User: A person who can login to the webapp and utilize its features.

Frontend: This webapp displays the buttons, boxes, and information needed for the user to interact with and build the story. 

Backend: Composed of JavaScript, Node.js, and Express. This system connects other parts of the system and also contains the processing logic to handle I/O from those other parts.

Agents: Work as an added layer on top of the LLM to observe and collect information, and then act on it as specified by some other block within the system.

OpenAI API: Receives and responds to requests from agents to generate a specified form of content

Firebase Database: The database provides storage for chapter & story history, votes, goals, critiques, and user authentication infor.

## DIAGRAM INFORMATION

1) User interaction with webpage includes agent selection, prompting stories, vetoing, and editing chapters.
2) The Frontend and Backend communicate back and forth by sending event signals and data through a WebSocket.
3) The Backend Processing Logic handles story compilation, votes, edits, and state updates among other things.
4) The Backend routes the tasks to be processed by Agents. Agents then make Decision based on the task.
5) The Agents' Decisions may include voting, critiquing, and editing.
6) Agents will request generation of content via an LLM. Generated content may include goals, critiques, outlines, or chapters.
7) Agents may also query the database to update their context and aid with their Decisions.
8) The Database stores data to be retrieved by the backend or agents. Stored data may include critiques, votes, goals, story and chapter history, etc.


