import Story from './Story.js';

describe('Story Class', () => {
  let story;

  beforeEach(() => {
    story = new Story(3); // Example: 3 chapters
  });

  it('should initialize with correct totalChapters and empty chapters array', () => {
    expect(story.totalChapters).toBe(3);
    expect(Array.isArray(story.chapters)).toBe(true);
    expect(story.chapters.length).toBe(0);
    expect(story.title).toBeUndefined();
    expect(story.outline).toBeUndefined();
  });

  it('should set outline correctly', () => {
    story.setOutline('This is the story outline.');
    expect(story.outline).toBe('This is the story outline.');
  });

  it('should add chapters correctly', () => {
    story.addChapter('Chapter 1 text');
    story.addChapter('Chapter 2 text');

    expect(story.chapters.length).toBe(2);
    expect(story.getChapter(0)).toBe('Chapter 1 text');
    expect(story.getChapter(1)).toBe('Chapter 2 text');
  });

  it('should return the correct number of current chapters', () => {
    expect(story.getCurrentChapter()).toBe(0);

    story.addChapter('First Chapter');
    expect(story.getCurrentChapter()).toBe(1);

    story.addChapter('Second Chapter');
    expect(story.getCurrentChapter()).toBe(2);
  });

  it('should return null for out-of-bounds chapter index', () => {
    expect(story.getChapter(5)).toBeNull();
  });

  it('should correctly serialize to JSON', () => {
    story.title = 'My Story';
    story.setOutline('An epic journey.');
    story.addChapter('Chapter 1');
    story.addChapter('Chapter 2');

    const json = story.toJSON();
    expect(json).toEqual({
      title: 'My Story',
      outline: 'An epic journey.',
      totalChapters: 3,
      chapters: ['Chapter 1', 'Chapter 2'],
    });
  });

  it('should correctly deserialize from JSON', () => {
    const json = {
      title: 'Another Story',
      outline: 'Outline of another story.',
      totalChapters: 5,
      chapters: ['Chapter A', 'Chapter B'],
    };

    story.fromJSON(json);

    expect(story.title).toBe('Another Story');
    expect(story.outline).toBe('Outline of another story.');
    expect(story.totalChapters).toBe(5);
    expect(story.chapters).toEqual(['Chapter A', 'Chapter B']);
  });

  it('should have an empty addPhase method by default', () => {
    // Just checking that it exists and does not throw an error
    expect(() => story.addPhase('Title', 'Winner', 'Outline')).not.toThrow();
  });
});
