---
sidebar_position: 1
---

**Purpose**

The Design Document - Part I Architecture describes the software architecture and how the requirements are mapped into the design. This document will be a combination of diagrams and text that describes what the diagrams are showing.

**Requirements**

In addition to the general requirements the Design Document - Part I Architecture will contain:

For each component provide class diagrams showing the classes to be developed (or used) and their relationship.

Sequence diagrams showing the data flow for _all_ use cases. One sequence diagram corresponds to one use case and different use cases should have different corresponding sequence diagrams.

# Components

Provided below are descriptions of the different components and their interfaces.

#### Client

This is a React-based web application that will require the use of a login page, a homeboard page, and a couple other accompanying pages (determined by the features added). The client will be connected to the server via a WebSocket connection that will allow for communication between the two components.

#### Server

The server will be hosted in AWS. It will link to the database.

#### Database

Firebase is used to store all of the necessary information generated and needed by the system to create the storyboard and drive user interaction. The database will contain information about chapters in the story, user data, and the generated critiques, goals, and votes.

#### LLM

The OpenAI API is used to generate content. It is connected to the Agents who request data for transmission and generation.

Use Case 1:
![image](https://github.com/user-attachments/assets/c206541e-89a9-4677-9078-6e35f7ac2ccd)

Use Case 2:
![image](https://github.com/user-attachments/assets/80036676-7917-4de5-8cf7-cfc37068f1a0)

Use Case 3: 
![image](https://github.com/user-attachments/assets/e838f7d0-f528-42fb-863c-e9cd9323bfd0)

Use Case 4: 
![image](https://github.com/user-attachments/assets/798665fc-c9c6-42fb-96de-73869a193e46)

Use Case 5: 
![image](https://github.com/user-attachments/assets/4397b5bc-f3e2-44dc-82b2-9588ec83cae8)

Use Case 6: 
![Use Case 6](https://github.com/user-attachments/assets/8836c91e-f13f-48cd-9071-78b5c9f90424)

Use Case 7:
![Use Case 7](https://github.com/user-attachments/assets/a1557169-1b04-43be-9736-1e510f3d0b1f)

Use Case 8: 
![Use Case 8](https://github.com/user-attachments/assets/4c93d63c-2306-4a6d-b17a-7d8f9f0fea41)

Use Case 9: 
![Use Case 9](https://github.com/user-attachments/assets/98c0b165-1bc6-4077-8571-1a0397d0bc0f)

Use Case 10:
![Use Case 10](https://github.com/user-attachments/assets/a04da8bc-ca30-4113-b3a6-0dab8f1a94b8)

Use Case 11: 
![Use Case 11](https://github.com/user-attachments/assets/9976e4cd-aeb7-4af7-94f7-15b6cc23b8b2)






Describe algorithms employed in your project, e.g. neural network paradigm, training and training data set, etc.

If there is a database:

Entity-relation diagram.

Table design.

A check list for architecture design is attached here [architecture\_design\_checklist.pdf](https://templeu.instructure.com/courses/106563/files/16928870/download?wrap=1 "architecture_design_checklist.pdf")  and should be used as a guidance.
