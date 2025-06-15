import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Incoming request is a multipart/form-data with 'file' and 'modelName' fields
    const formData = await req.formData();
    const file = formData.get('file');
    const modelName = formData.get('modelName');

    if (!file || !modelName) {
      return new Response(JSON.stringify({ error: 'Missing file or modelName' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Convert file to base64
    const arrayBuffer = await (file as File).arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString('base64');
    const mimeType = (file as File).type;
    const fileName = (file as File).name;
    const fileSize = (file as File).size;

    return new Response(
      JSON.stringify({
        base64: base64Data,
        fileName,
        mimeType,
        size: fileSize,
        modelName,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    console.error('Error processing image upload:', err);
    return new Response(
      JSON.stringify({ error: 'Error processing image upload' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
