import Agent from "../Classes/Agent";
import API from '../api/api.js';
import { personas } from '../data/Personas.js';

// Mock API module
jest.mock('../api/api.js', () => ({
    post: jest.fn(),
}));

describe('Agent Class', () => {
    let agent;

    beforeEach(() => {
        agent = new Agent('defaultPersona', 'openai'); // Mock Persona
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should initialize properly', () => {
        expect(agent.persona).toBe('mockPersona');
        expect(agent.chapterHistory).toEqual([]);
        expect(agent.votedChapterHistory).toEqual([]);
        expect(agent.chapter).toBe('');
        expect(agent.profile).toEqual(personas['mockPersona']);
    });

    test('generateOutline should call createOutline and update chapterHistory', async () => {
        API.post.mockResolvedValueOnce({ data: { message: 'Test outline' } });

        const outline = await agent.generateOutline('a journey through space');

        expect(outline).toBe('Test outline');
        expect(agent.chapterHistory).toContain('Test outline');
        expect(API.post).toHaveBeenCalledTimes(1);
    });

    test('generateChapter should call API and update chapterHistory for openai', async () => {
        agent.outline = 'Outline text';
        agent.chapter = 'Previous chapter';

        API.post.mockResolvedValueOnce({ data: { message: 'New chapter text' } });

        const chapter = await agent.generateChapter(agent.outline, agent.chapter);

        expect(chapter).toBe('New chapter text');
        expect(agent.chapterHistory).toContain('New chapter text');
        expect(API.post).toHaveBeenCalledTimes(1);
    });

    test('testAccuracy should analyze the chapter', async () => {
        agent.chapter = 'Some chapter text';
        API.post.mockResolvedValueOnce({ data: { message: '90% accuracy - very in character.' } });

        const result = await agent.testAccuracy();

        expect(result).toBe('90% accuracy - very in character.');
        expect(API.post).toHaveBeenCalledTimes(1);
    });

    test('promptAgentToVote should return votedIndex and voteValue', async () => {
        agent.chapterHistory = ['Chapter 1', 'Chapter 2', 'Chapter 3'];

        const result = await agent.promptAgentToVote();

        expect(result).toHaveProperty('votedIndex');
        expect(result).toHaveProperty('voteValue', 1);
    });

    test('analyseAndVote should pick the longest chapter', () => {
        const chapters = ['Short', 'Much longer chapter', 'Tiny'];

        const voted = agent.analyseAndVote(chapters);

        expect(voted).toBe('Much longer chapter');
    });

    test('sendVote should log and return true for valid vote', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        const result = agent.sendVote('This is a chapter');
        expect(result).toBe(true);
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });

    test('setPersona should update persona', () => {
        const result = agent.setPersona('newPersona');
        expect(result).toBe(true);
        expect(agent.persona).toBe('newPersona');
    });

    test('adaptToNewChapter should append feedback', () => {
        agent.chapter = 'Original Chapter';
        agent.adaptToNewChapter('Add more action.');

        expect(agent.chapter).toContain('[Agent adapts: Add more action.]');
    });

    test('setChapterCount should update totalChapters', () => {
        agent.setChapterCount(10);
        expect(agent.totalChapters).toBe(10);
    });

    test('setAgentID should update agentid', () => {
        agent.setAgentID('Agent123');
        expect(agent.agentid).toBe('Agent123');
    });

    test('addVotedChapter should update votedChapterHistory', () => {
        agent.addVotedChapter('Winning Chapter');

        expect(agent.votedChapterHistory).toContain('Winning Chapter');
    });

    test('getVotedChapterHistory should trim and join voted chapters', () => {
        agent.votedChapterHistory = ['Chapter 0', 'Chapter 1', 'Chapter 2'];

        const result = agent.getVotedChapterHistory();

        expect(result).toBe('Chapter 1\n\nChapter 2');
    });

    test('vote should pick chapter from map based on AI response', async () => {
        const chaptersMap = new Map();
        chaptersMap.set('Chapter A', {});
        chaptersMap.set('Chapter B', {});

        API.post.mockResolvedValueOnce({ data: { message: '1 This chapter is great because...' } });

        const picked = await agent.vote(chaptersMap);

        expect(picked).toBe('Chapter A');
        expect(API.post).toHaveBeenCalledTimes(1);
    });

    test('createOutline should call API and update outline', async () => {
        API.post.mockResolvedValueOnce({ data: { message: 'Outline result' } });

        const result = await agent.createOutline('A great war', 5);

        expect(result).toBe('Outline result');
        expect(agent.outline).toBe('Outline result');
    });
});
