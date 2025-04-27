---
title: API
description: API Specification
hide_table_of_contents: true
sidebar_position: 2
---

# Firebase API Documentation

## User Management

### `POST /Users`
- Creates a new user and stores it in the `Users` collection.

### `GET /Users/{userId}`
- Retrieves user data from the `Users` collection.

---

## Session Management

### `POST /Users/{userId}/Sessions`
- Creates a new session for the user and stores it in the `Sessions` subcollection.

### `GET /Users/{userId}/Sessions/{sessionId}`
- Retrieves session data from the `Sessions` subcollection.

---

## Agent Management

### `POST /Users/{userId}/Sessions/{sessionId}/Agents`
- Creates a new agent and stores it in the `Agents` subcollection under the session.

### `GET /Users/{userId}/Sessions/{sessionId}/Agents/{agentId}`
- Retrieves agent data from the `Agents` subcollection.

---

## Story Management

### `POST /Users/{userId}/Sessions/{sessionId}/Stories`
- Creates a new story and stores it in the `Stories` subcollection under the session.

### `GET /Users/{userId}/Sessions/{sessionId}/Stories/{storyId}`
- Retrieves story data from the `Stories` subcollection.

---

## Agent Story Outline and Chapters

### `POST /Users/{userId}/Sessions/{sessionId}/Agents/{agentId}/Outline`
- Creates and stores a story outline in the `Outline` subcollection under the agent.

### `GET /Users/{userId}/Sessions/{sessionId}/Agents/{agentId}/Outline`
- Retrieves the story outline from the `Outline` subcollection under the agent.

### `POST /Users/{userId}/Sessions/{sessionId}/Agents/{agentId}/Chapters`
- Creates and stores a chapter in the `Chapters` subcollection under the agent.

### `GET /Users/{userId}/Sessions/{sessionId}/Agents/{agentId}/Chapters`
- Retrieves all chapters from the `Chapters` subcollection under the agent.

---

## Final Story Outline and Chapters

### `POST /Users/{userId}/Sessions/{sessionId}/Stories/{storyId}/Outline`
- Creates and stores a final story outline in the `Outline` subcollection under the story.

### `GET /Users/{userId}/Sessions/{sessionId}/Stories/{storyId}/Outline`
- Retrieves the final story outline from the `Outline` subcollection under the story.

### `POST /Users/{userId}/Sessions/{sessionId}/Stories/{storyId}/Chapters`
- Creates and stores a final chapter in the `Chapters` subcollection under the story.

### `GET /Users/{userId}/Sessions/{sessionId}/Stories/{storyId}/Chapters`
- Retrieves all final chapters from the `Chapters` subcollection under the story.

---

## AI Integration

### `POST /api/chat`

Sends a prompt and persona to the DeepSeek API and returns a generated response.

#### Request Body:
```json
{
  "prompt": "Write a story about a dragon",
  "persona": "Dr. Suess"
}
```

### `POST /api/openai`

Sends a prompt and persona to the OpenAI API and returns a generated response.

#### Request Body:
```json
{
  "userPrompt": "Explain quantum physics",
  "persona": "Albert Einstein"
}
```