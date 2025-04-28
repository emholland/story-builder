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