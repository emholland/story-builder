// /tests/openai.test.js
import request from 'supertest';  // Supertest for making requests
import {app} from './server.js';    // Import your Express app

// Mock the OpenAI API client
jest.mock('openai'); 

describe('POST /api/openai', () => {
  it('should return a successful response with a message', async () => {
    // Setup the mock response from OpenAI API
    const mockResponse = {
      choices: [{ message: { content: 'This is a mock response.' } }],
    };

    // Mock the OpenAI API call to return the above mockResponse
    OpenAI.prototype.chat.completions.create.mockResolvedValue(mockResponse);

    // Simulate a POST request to the endpoint
    const response = await request(app)
      .post('/api/openai')
      .send({ prompt: 'Test prompt' })
      .expect('Content-Type', /json/)
      .expect(200);

    // Assert that the response contains the mocked message
    expect(response.body.message).toBe('This is a mock response.');
  });

  it('should handle errors correctly', async () => {
    // Mock the OpenAI API to throw an error
    OpenAI.prototype.chat.completions.create.mockRejectedValue(new Error('API Error'));

    const response = await request(app)
      .post('/api/openai')
      .send({ prompt: 'Test prompt' })
      .expect('Content-Type', /json/)
      .expect(500);

    // Assert that the response contains the expected error message
    expect(response.body.error).toBe('Failed to fetch completion');
  });
});
