import { type NextRequest } from 'next/server';

const serviceHost = process.env.SERVICE_HOST || 'localhost'; // Default to localhost if not set
const servicePort = process.env.SERVICE_PORT || '5001';
const serviceUrl = `http://${serviceHost}:${servicePort}`;

export async function POST(req: NextRequest) {
  try {
    const reqParsed = await req.json();
    const { data, modelName } = reqParsed;
    const response = await fetch(`${serviceUrl}/logs/${modelName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });
    return response;
  } catch (err) {
    console.error('Error:    ', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
