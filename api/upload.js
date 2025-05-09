import multer from 'multer';
import pdfParse from 'pdf-parse';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import cors from 'cors';

// Initialize middleware
dotenv.config();

// OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Multer setup for serverless
const multerMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Helper function to handle errors
const handleError = (error) => {
  console.error('Resume processing error:', {
    message: error.message,
    type: error.response ? 'API_ERROR' : error.request ? 'NETWORK_ERROR' : 'CODE_ERROR',
    status: error.response?.status,
    code: error.code
  });
  
  const statusCode = error.response?.status || 500;
  const errorMessage = error.response?.data?.error?.message || 'Failed to process resume';
  
  return {
    status: statusCode,
    body: {
      error: errorMessage,
      code: error.code || 'UNKNOWN_ERROR'
    }
  };
};

// CORS middleware
const corsMiddleware = cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [/\.vercel\.app$/, /localhost/] 
    : '*'
});

// Serverless function handler
export default async function handler(req, res) {
  // Apply CORS
  await new Promise((resolve, reject) => {
    corsMiddleware(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Process the file upload using multer
    const processFile = () => {
      return new Promise((resolve, reject) => {
        const upload = multerMiddleware.single('resume');
        upload(req, res, (err) => {
          if (err) return reject(err);
          resolve(req.file);
        });
      });
    };

    // Wait for file upload to complete
    const file = await processFile();
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded', code: 'NO_FILE' });
    }

    // Extract text from PDF
    const dataBuffer = file.buffer;
    const pdfData = await pdfParse(dataBuffer);
    const extractedText = pdfData.text;

    // Send extracted text to OpenAI for structuring
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

    try {
      const structuredData = JSON.parse(completion.choices[0].message.content);
      return res.status(200).json({ data: structuredData });
    } 
    catch (parseError) {
      throw new Error('Invalid response format from AI service');
    }
  } 
  catch (error) {
    const errorResponse = handleError(error);
    return res.status(errorResponse.status).json(errorResponse.body);
  }
}