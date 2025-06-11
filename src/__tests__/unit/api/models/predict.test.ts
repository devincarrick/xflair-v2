import { NextRequest } from 'next/server';

// Mock fetch globally
global.fetch = jest.fn();

describe('POST /models/actions/image/predict', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset environment variables
    delete process.env.SERVICE_HOST;
    delete process.env.SERVICE_PORT;
  });

  it('should successfully forward prediction request to TensorFlow service', async () => {
    // Mock successful response from TensorFlow service
    const mockResponse = {
      predictions: {
        predicted_class: 'golden_retriever',
        predicted_class_name: 'Golden Retriever',
        class_name_probabilities: {
          golden_retriever: 0.95,
          labrador_retriever: 0.03,
          german_shepherd: 0.02
        }
      },
      time: 0.15
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      status: 200
    });

    // Create test request
    const requestBody = {
      data: 'base64-encoded-image-data',
      modelName: 'MobileNet'
    };

    // Import POST here for all tests except the env var test
    const { POST } = require('@/app/(routes)/models/actions/image/predict/route');
    const request = new NextRequest('http://localhost:3000/models/actions/image/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    // Call the API route
    const response = await POST(request);
    const responseData = await response.json();

    // Assertions
    expect(response.status).toBe(200);
    expect(responseData).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:5001/predictions/MobileNet',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: 'base64-encoded-image-data' })
      }
    );
  });

  it('should use environment variables for service URL when provided', async () => {
    // Set environment variables
    process.env.SERVICE_HOST = 'tensorflow-service';
    process.env.SERVICE_PORT = '8080';
    jest.resetModules(); // Ensure module is reloaded with new env vars
    // Import POST after setting env vars
    const { POST } = require('@/app/(routes)/models/actions/image/predict/route');

    const mockResponse = { predictions: {}, time: 0.1 };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      status: 200
    });

    const request = new NextRequest('http://localhost:3000/models/actions/image/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: 'test', modelName: 'MobileNet' })
    });

    await POST(request);

    expect(global.fetch).toHaveBeenCalledWith(
      'http://tensorflow-service:8080/predictions/MobileNet',
      expect.any(Object)
    );
  });

  it('should handle TensorFlow service errors gracefully', async () => {
    // Import POST here for all tests except the env var test
    const { POST } = require('@/app/(routes)/models/actions/image/predict/route');
    // Mock failed response from TensorFlow service
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      text: async () => 'Internal Server Error'
    });

    const request = new NextRequest('http://localhost:3000/models/actions/image/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: 'test', modelName: 'MobileNet' })
    });

    const response = await POST(request);

    expect(response.status).toBe(500);
    expect(await response.text()).toBe('Internal Server Error');
  });

  it('should handle network errors gracefully', async () => {
    const { POST } = require('@/app/(routes)/models/actions/image/predict/route');
    // Mock network error
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const request = new NextRequest('http://localhost:3000/models/actions/image/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: 'test', modelName: 'MobileNet' })
    });

    const response = await POST(request);

    expect(response.status).toBe(500);
    expect(await response.text()).toBe('Internal Server Error');
  });

  it('should handle malformed JSON in request body', async () => {
    const { POST } = require('@/app/(routes)/models/actions/image/predict/route');
    const request = new NextRequest('http://localhost:3000/models/actions/image/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'invalid-json'
    });

    const response = await POST(request);

    expect(response.status).toBe(500);
    expect(await response.text()).toBe('Internal Server Error');
  });
});