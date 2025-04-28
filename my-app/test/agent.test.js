import 'openai/shims/node';

import Agent from "../Classes/Agent";
import axios from 'axios';
import OpenAI from 'openai';
import { jest } from '@jest/globals';
//import { handleAuthentication } from "./authentication.js";
import { personas } from "../data/Personas.js";

//Mock API for import.meta.env
jest.mock('../api/api.js');

// Mock the axios post method
jest.mock('axios');

// Persona & Outline example for test
const mockPersona = 'Mock Persona';
const mockOutline = 'This is a mock outline for a story about blue cats.';
const mockChapter = 'This is a mock chapter.';
const mockAccuracy = '95% - Very accurate to the selected persona.';
const mockVoteResponse = {
    message: '1 Great description and vivid imagery.'
};

describe('Agent Class', () => {
    let agent;

    beforeEach(() => {
        agent = new Agent(mockPersona, 'openai');
        agent.setChapterCount(3);
    });

    test('should generate an outline', async () => {
        agent.outline = mockOutline;
        axios.post.mockResolvedValueOnce({ data: {message: mockChapter } });

        const result = await agent.generateChapter();
        expect(result).toBe(mockChapter);
        expect(agent.chapterHistory.includes(mockChapter)).toBe(true);
    });

    test('should generate a chapter', async () => {
        agent.outline = mockOutline;
        axios.post.mockResolvedValueOnce({ data: { message: mockChapter } });

        const result = await agent.generateChapter(mockOutline, '');
        expect(result).toBe(mockChapter);
        expect(agent.chapterHistory.includes(mockChapter)).toBe(true);
    });

    test('should test accuracy of the last chapter', async () => {
        agent.chapter = mockChapter;
        axios.post.mockResolvedValueOnce({ data: { message: mockAccuracy } });

        const result = await agent.testAccuracy();
        expect(result).toBe(mockAccuracy);
    });

    test('should vote on chapters', async () => {
        const mockChapterMap = new Map([
            [mockChapter, 'Agent1'],
            ['Another chapter goes here.', 'Agent2']
        ]);
        axios.post.mockResolvedValueOnce({ data: mockVoteResponse });

        const votedChapter = await agent.vote(mockChapterMap);
        expect(votedChapter).toBe(mockChapter);
    });

    test('should analyze and vote on chapter', () => {
        const chapters = ['short chapter', 'much longer chapter here'];
        const vote = agent.analyseAndVote(chapters);
        expect(vote).toBe('much longer chapter here');
    });

    test('should send vote', () => {
        const result = agent.sendVote('This is a vote.');
        expect(result).toBe(true);
    });
});
