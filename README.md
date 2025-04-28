[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=17857564)
<div align="center">

# Story Builder Project - Team II
[![Report Issue on Jira](https://img.shields.io/badge/Report%20Issues-Jira-0052CC?style=flat&logo=jira-software)](https://temple-cis-projects-in-cs.atlassian.net/jira/software/c/projects/DT/issues)
[![Deploy Docs](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml/badge.svg)](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml)
[![Documentation Website Link](https://img.shields.io/badge/-Documentation%20Website-brightgreen)](https://capstone-projects-2025-spring.github.io/project-003-story-builder-team-2/)



</div>

# Document Overview
This document will show the proccess and procedures of using the web application 'Story Builder.'

# Keywords

*#WebApplication*, *#AI*, *#React*, *#Story-Building*, *#Javascript*, *#AI*, *#LLM*, *#AIAgents*

# Project Abstract

This document proposes a web application in which AI-agents interact with each other to flesh out a prompt given by the user.

# High Level Requirement

This is a web application that users can use to create a story. It can create many AI-agents that acts as authors that the user gives them and tell them to write out a full story based on a prompt or genre given to them. They will create their version, vote for the best, critique the work, make a goal, and continue to write the story. This process will repeat until the final draft of the story is written. Users help progress the story but do not contribute any writing to it beyond the prompt, number of chapters, the story title, and agent selection.

# Required Resources

For this project, developers require knowledge and skills in the following areas...

### Software:
- Frontend:
    - React
    - Vite
- Backend:
    - OpenAI & DeepSeek API
    - Javascript
    - Node.js
- Database:
    - Firebase
- Containerization:
    - Docker

### Skills:
- Prompt engineering
- Asynchronous programming 
- Firebase rules and functions

# Release Date
**Start Date** 01-27-25\
**Old Version**: 1.0.0 (as of 03/18/2025)\
**Old Version**: 2.0.0 (as of 4/6/2025)\
**Current Version**: 3.0.0 (as of 4/24/2025)

# Version
v3.0.0

# Collaborators

[//]: # ( readme: collaborators -start )
<table>
<tr>
    <td align="center">
        <a href="https://github.com/chiikugo">
            <img src="https://avatars.githubusercontent.com/u/89407292?v=4" width="100;" alt="ApplebaumIan"/>
            <br />
            <sub><b>Chiku Okechukwu</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/tur97019">
            <img src="https://avatars.githubusercontent.com/u/93138432?v=4" width="100;" alt="ApplebaumIan"/>
            <br />
            <sub><b>Cole Dirnbeck</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/csimmons2024">
            <img src="https://avatars.githubusercontent.com/u/122992651?v=4" width="100;" alt="ApplebaumIan"/>
            <br />
            <sub><b>Chloe Simmons</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/EthanLongtuq">
            <img src="https://avatars.githubusercontent.com/u/156948979?v=4" width="100;" alt="ApplebaumIan"/>
            <br />
            <sub><b>Ethan Long</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/emholland">
            <img src="https://avatars.githubusercontent.com/u/102695327?v=4" width="100;" alt="ApplebaumIan"/>
            <br />
            <sub><b>Elisa Holland</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/NeverEverFelix">
            <img src="https://avatars.githubusercontent.com/u/134745489?v=4" width="100;" alt="ApplebaumIan"/>
            <br />
            <sub><b>Felix Moronge</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/sharrontum">
            <img src="https://avatars.githubusercontent.com/u/93138432?v=4" width="100;" alt="ApplebaumIan"/>
            <br />
            <sub><b>Sharron Tum</b></sub>
        </a>
    </td>
</tr>
</table>

# How to use the project:

- locally (see local installation)
- externally: visit https://storybuilder.online/

## Local Installation

[1] Clone the Git repo into a folder on your computer

```json
git clone https://github.com/Capstone-Projects-2025-Spring/project-003-story-builder-team-2.git
```

[2] navigate to the my-app folder/level

```json
cd project-003-story-builder-team-2
cd my-app
```

[3] install all of the project dependencies

``` json
npm install
```

[4] under the my-app folder create a .env file with the following contents (variables with ... are hidden for safety concerns for now)

``` json
OPENAI_API_KEY=...


DEEPSEEK_API_KEY=...


FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_DATABASE_URL=...
FIREBASE_PROJECT_ID=...
FIREBASE_STORAGE_BUCKET=...
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=...
FIREBASE_MEASUREMENT_ID=..


VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_DATABASE_URL=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...

VITE_API_URL=https://localhost:5001
```

[5] run the project

``` json
npm run dev
```

Then that should be all!

[//]: # ( readme: collaborators -end )
