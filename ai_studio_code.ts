// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

// FIX: Import Buffer to resolve 'Cannot find name Buffer' error.
import { Buffer } from 'node:buffer';
import {
  GoogleGenAI,
  // FIX: Import Modality for use in responseModalities config.
  Modality,
} from '@google/genai';
import mime from 'mime';
// FIX: Use node: prefix for built-in modules.
import { writeFile } from 'node:fs';

function saveBinaryFile(fileName: string, content: Buffer) {
  writeFile(fileName, content, 'utf8', (err) => {
    if (err) {
      console.error(`Error writing file ${fileName}:`, err);
      return;
    }
    console.log(`File ${fileName} saved to file system.`);
  });
}

async function main() {
  const ai = new GoogleGenAI({
    // FIX: Use process.env.API_KEY as per coding guidelines.
    apiKey: process.env.API_KEY,
  });
  const config = {
    temperature: 0.6,
    topP: 0.8,
    // FIX: Use Modality enum for responseModalities.
    responseModalities: [
        Modality.IMAGE,
        Modality.TEXT,
    ],
    // FIX: systemInstruction should be a string, not an array of objects.
    systemInstruction: `You are an intelligent story structuring agent that receives unstructured stories or freeform narratives and converts them into structured script data that can be used for automated video generation.

You analyze the user’s raw input and output a complete, formatted structure that includes scene division, characters, dialogue, background hints, and timing notes.

You never invent new characters unless necessary; instead, you extract and name them from the story context. You maintain logical sequence and visual cues suitable for animation or video assembly.`,
  };
  const model = 'gemini-2.5-flash-image';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fileIndex = 0;
  for await (const chunk of response) {
    if (!chunk.candidates || !chunk.candidates[0].content || !chunk.candidates[0].content.parts) {
      continue;
    }
    if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
      const fileName = `ENTER_FILE_NAME_${fileIndex++}`;
      const inlineData = chunk.candidates[0].content.parts[0].inlineData;
      const fileExtension = mime.getExtension(inlineData.mimeType || '');
      // FIX: This line no longer errors as Buffer is now imported.
      const buffer = Buffer.from(inlineData.data || '', 'base64');
      saveBinaryFile(`${fileName}.${fileExtension}`, buffer);
    }
    else {
      console.log(chunk.text);
    }
  }
}

main();
