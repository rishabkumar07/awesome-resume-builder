import formidable from 'formidable';
import pdfParse from 'pdf-parse';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';

dotenv.config();

export const config = {
  api: {
    bodyParser: false,
  },
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const corsMiddleware = cors({
  origin: process.env.NODE_ENV === 'production' ? [/\.vercel\.app$/, /localhost/] : '*',
});

export default async function handler(req, res) {
  await new Promise((resolve, reject) => {
    corsMiddleware(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      resolve(result);
    });
  });

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({ maxFileSize: 10 * 1024 * 1024 });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Formidable error:', err);
      return res.status(400).json({ error: 'File upload error' });
    }

    const file = files.resume;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded', code: 'NO_FILE' });
    }

    try {
      const dataBuffer = fs.readFileSync(file[0].filepath);
      const pdfData = await pdfParse(dataBuffer);
      const extractedText = pdfData.text;

      const prompt = `
        Extract the following details from this resume text and return as JSON:
        {
          "name": "",
          "email": "",
          "phone": "",
          "education": [],
          "work_experience": [{"title":"","company":"","date_range":"","description":""}],
          "projects": [{"title":"","technologies":"","description":""}],
          "skills": []
        }
        Keep work_experience and projects as separate sections.

        Resume Text:
        ${extractedText}
      `;

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      });

      const structuredData = JSON.parse(completion.choices[0].message.content);
      return res.status(200).json({ data: structuredData });
    } catch (error) {
      console.error('Resume processing error:', error);
      return res.status(500).json({ error: error.message || 'Failed to process resume' });
    }
  });
}
