---
title: Development Environment
sidebar_position: 5
---

# Development Environment

The project is containerized using **Docker** to ensure a consistent and isolated development environment across all stages of development. This approach helps in avoiding environment discrepancies and streamlining deployment processes. You can access the Docker container configuration and documentation here ____________.

For database solutions, we employed **Firebase** for managing user and agent data and authentication. Additionally, we utilized **DeepSeek** and **OpenAI** for content generation.

Throughout development, we conducted testing compatibility with various browsers, guaranteeing a seamless user experience across platforms. The project’s design and planning phases were supported by a variety of tools, including Figma for UI/UX design, Jira for task management and issue tracking, Miro for brainstorming and collaboration, and Google Docs for documentation and content management.

## Continuous Integration & Deployment (CI/CD)  
The project uses **GitHub Actions** for automated testing and deployment.

***(latest versions as of 03/2025)***

## Required Hardware ##
- One wifi & internet-connected electronic device
- At least 8 GB ram and a high-performance GPU

## Required Software ##
- **Any Valid Browser** – Recommended: Chrome, or Safari for best compatibility  
- **Google Firebase** – Manages authentication and database  
- **GitHub** – Version control and collaboration  
- **Docker** – Containerization for a consistent development environment  
- **OpenAI & DeepSeek** – AI-powered content generation  
- **npm v10.9.0** – Package manager for dependencies  
- **React v19.0.0** – Frontend framework  

## Selected IDE ##
- **VSCode v1.97.20**

## Compilers ##
- **Node.js v22.11.0**

## Test Tools ##
- **Jest Testing v29.7.0** - Used for unit and integration testing
- **Supertest v7.0.0** - Used for API testing

## Build Tools ##
- **Vite.js v6.1.0**
- **Rollup v2.70.0**

## Environment Variables ## 

- **DEEPSEEK_API_KEY**= aaaaaaaa
- **OPENAI_API_KEY**= aaaaaaaa
- **VITE_FIREBASE_API_KEY**= aaaaaaaaa
- **VITE_FIREBASE_AUTH_DOMAIN**= aaaaaaaa
-  **VITE_FIREBASE_DATABASE_URL**= aaaaaaaa
- **VITE_FIREBASE_PROJECT_ID**= aaaaaaaa
- **VITE_FIREBASE_STORAGE_BUCKET**= aaaaaaaa
- **VITE_FIREBASE_MESSAGING_SENDER_ID**= aaaaaaaa
- **VITE_FIREBASE_APP_ID**= aaaaaaaa
- **VITE_FIREBASE_MEASUREMENT_ID**= aaaaaaaa
- **VITE_API_URL**=http://localhost:5001

## Optional Software ##
- Docusaurus
- Figma
- Jira
- Miro
- Google Docs/Drive