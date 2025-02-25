---
title: System Overview
sidebar_position: 1
---

# System Overview

## Project Abstract
This document proposes a web application that generates and edits new stories through AI agents. The application will feature a back end that creates several agents (writers) capable of generating unique stories based on user prompts. The generated stories will then be subject to user voting, allowing the best version to be selected and revised before further material is developed. The context will be saved and used to create more complete narratives over time. This approach enables users to rely on AI agents instead of outsourcing to traditional writers, facilitating quicker story creation and providing outlines and templates for writers to build upon. Additionally, the application will collect data on story factors, such as the frequency of character mentions and occurrences of hallucinations.

## Conceptual Design
Story Builder is a web application built using the React.js framework, along with HTML and CSS, for front-end editing and handling user inputs and prompts sent to the backend. The backend will primarily run on the Node.js server environment, which will funnel prompts into our OpenAI or Deepseek API calls that return the generated story to the front end for users to continuously edit and expand. This cycle—prompt, receive, revise—will be repeated until the story is complete, with the context stored either in Node or in a SQL database.

## Background
This application is designed to streamline the creative writing process by combining the content generation capabilities of AI with user-driven  refinement, creating a tool that enhances both efficiency and creativity. By allowing users to prompt and guide multiple AI-generated drafts and then vote on the best version, the app establishes a collaborative environment where human insight directly shapes the narrative. This approach not only reduces the time and cost associated with traditional writing methods but also serves as a resource for overcoming writer’s block and sparking new ideas. Additionally, by collecting detailed data on story elements—such as character mentions and narrative consistency—the platform offers actionable insights to further refine and enhance storytelling quality. Built on a modern technological stack with React.js and Node.js.