// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { Buffer } from 'node:buffer';
import {
  GoogleGenAI,
  Modality,
} from '@google/genai';
import mime from 'mime';
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
    apiKey: process.env.API_KEY,
  });
  // FIX: For the 'gemini-2.5-flash-image' model, only the 'responseModalities' config is supported for image editing.
  // Other properties like temperature, topP, and systemInstruction have been removed to comply with the guidelines.
  const config = {
    responseModalities: [
        Modality.IMAGE,
        Modality.TEXT,
    ],
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
      const buffer = Buffer.from(inlineData.data || '', 'base64');
      saveBinaryFile(`${fileName}.${fileExtension}`, buffer);
    }
    else {
      console.log(chunk.text);
    }
  }
}

main();
