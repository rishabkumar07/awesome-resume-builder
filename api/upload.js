import formidable from 'formidable';
import fs from 'fs';
import { PDFExtract } from 'pdf.js-extract';
import OpenAI from 'openai';
import cors from 'cors';
import dotenv from 'dotenv';

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
  origin: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  maxAge: 86400
});

export default async function handler(req, res) {
  await new Promise((resolve, reject) => {
    corsMiddleware(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      resolve();
    });
  });

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({});

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
      
      const pdfExtract = new PDFExtract();
      const extractOptions = {};
      
      const data = await pdfExtract.extractBuffer(dataBuffer, extractOptions);
      
      const extractedText = data.pages
        .map(page => page.content.map(item => item.str).join(' '))
        .join('\n');

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
        IMPORTANT: Ensure your response is valid JSON. Use double quotes for all property names and string values.

        Resume Text:
        ${extractedText}
      `;

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      });

      let structuredData;
      try {
        structuredData = JSON.parse(completion.choices[0].message.content);
      } catch (jsonError) {
        console.error('JSON parsing error:', jsonError);
        console.log('Raw response:', completion.choices[0].message.content);
        
        let fixedJson = completion.choices[0].message.content;
        
        fixedJson = fixedJson.replace(/```json/g, '').replace(/```/g, '');
        
        try {
          structuredData = JSON.parse(fixedJson);
        } catch (err) {
          structuredData = {
            name: "Could not parse resume",
            email: "",
            phone: "",
            education: [],
            work_experience: [],
            projects: [],
            skills: []
          };
        }
      }
      
      return res.status(200).json({ data: structuredData });
    } catch (error) {
      console.error('Resume processing error:', error);
      return res.status(500).json({ error: error.message || 'Failed to process resume' });
    } finally {
      if (file && file[0] && file[0].filepath) {
        try {
          fs.unlinkSync(file[0].filepath);
        } catch (cleanupError) {
          console.error('Error cleaning up temporary file:', cleanupError);
        }
      }
    }
  });
}
