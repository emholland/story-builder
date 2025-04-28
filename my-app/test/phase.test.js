import Phase from '../Classes/Phase';

describe('Phase Class', () => {
  let phase;

  beforeEach(() => {
    // Create a new hase before test
    phase = new Phase(1);
  });

  test('should create a Phase instance with the correct number', () => {
    expect(phase.number).toBe(1);
  });

  test('should set and get the title correctly', () => {
    phase.setTitle('Phase 1 Title');
    expect(phase.title).toBe('Phase 1 Title');
  });

  test('should set and get the outlineSnippet correctly', () => {
    const snippet = 'This is the outline snippet for Phase 1';
    phase.setOutlineSnippet(snippet);
    expect(phase.outlineSnippet).toBe(snippet);
  });

  test('should set and get the winner correctly', () => {
    const winner = 'Agent A';
    phase.setWinner(winner);
    expect(phase.winner).toBe(winner);
  });

  test('should set and get the text correctly', () => {
    const text = 'This is some text for Phase 1';
    phase.setText(text);
    expect(phase.text).toBe(text);
  });

  test('should convert Phase to JSON correctly', () => {
    phase.setTitle('Phase 1');
    phase.setOutlineSnippet('Phase 1 outline snippet');
    phase.setWinner('Agent A');
    phase.setText('This is some text for Phase 1');

    const phaseJSON = phase.toJSON();
    expect(phaseJSON).toEqual({
      number: 1,
      title: 'Phase 1',
      winner: 'Agent A',
      outlineSnippet: 'Phase 1 outline snippet',
      text: 'This is some text for Phase 1',
    });
  });

  test('should create a Phase instance from JSON', () => {
    const json = {
      number: 1,
      title: 'Phase 1',
      winner: 'Agent A',
      outlineSnippet: 'Phase 1 outline snippet',
      text: 'This is some text for Phase 1',
    };

    const newPhase = Phase.fromJSON(json);
    expect(newPhase).toBeInstanceOf(Phase);
    expect(newPhase.number).toBe(1);
    expect(newPhase.title).toBe('Phase 1');
    expect(newPhase.winner).toBe('Agent A');
    expect(newPhase.outlineSnippet).toBe('Phase 1 outline snippet');
    expect(newPhase.text).toBe('This is some text for Phase 1');
  });
});
