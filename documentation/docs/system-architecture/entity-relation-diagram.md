---
title: Entity Relation Diagram
sidebar_position: 4
---

![View the Entity Relation Diagram](/img/ERD.jpg)

**Figure 1.14 (shown above)**

The database is comprised of 4 entities: Users, Sessions, Agents, and Stories. The primary entity is User. Sessions are associated with User through the primary key user_id: Agent and Story are associated with Sessions through the primary key (PK) session_id. Each User can create multiple sessions. Within each session, a user can select multiple agents to help build the story, and they can also build multiple stories. The agent votes and critiques are not currently stored in the database. 

<!--![Table Description](/img/table-des.jpeg)-->