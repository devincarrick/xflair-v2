import request from 'supertest';
import fs from 'fs';
import path from 'path';

const SERVICE_HOST = process.env.SERVICE_HOST || 'localhost';
const SERVICE_PORT = process.env.SERVICE_PORT || '5001';
const BASE_URL = `http://${SERVICE_HOST}:${SERVICE_PORT}`;
const MODEL_NAME = 'MobileNet';

// Read the JPEG test image and encode as base64
const imagePath = path.join(__dirname, 'e2e/cypress/fixtures/test-image.jpg');
const imageBuffer = fs.readFileSync(imagePath);
const base64Image = imageBuffer.toString('base64');

describe('Docker Service Health Check', () => {
  it('should respond to predictions endpoint', async () => {
    const res = await request(BASE_URL)
      .post(`/predictions/${MODEL_NAME}`)
      .send({ data: base64Image });
    expect(res.status).toBe(200);
  });

  it('should respond to heatmaps endpoint', async () => {
    const res = await request(BASE_URL)
      .post(`/heatmaps/${MODEL_NAME}`)
      .send({ data: base64Image });
    expect(res.status).toBe(200);
  });

  it('should respond to logs endpoint', async () => {
    const res = await request(BASE_URL)
      .post(`/logs/${MODEL_NAME}`)
      .send({ data: base64Image });
    expect(res.status).toBe(200);
  });
}); 