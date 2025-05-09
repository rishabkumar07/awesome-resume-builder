import express from 'express';
import cors from 'cors';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const handleError = (error, res) => {
  console.error('Resume processing error:', {
    message: error.message,
    type: error.response ? 'API_ERROR' : error.request ? 'NETWORK_ERROR' : 'CODE_ERROR',
    status: error.response?.status,
    code: error.code
  });
  
  const statusCode = error.response?.status || 500;
  const errorMessage = error.response?.data?.error?.message || 'Failed to process resume';
  
  res.status(statusCode).json({
    error: errorMessage,
    code: error.code || 'UNKNOWN_ERROR'
  });
};

// Route: Handle PDF upload and extract text
app.post('/api/upload', upload.single('resume'), async (req, res) => {
    try {
      if (!req.file)
        return res.status(400).json({ error: 'No file uploaded', code: 'NO_FILE' });

      const dataBuffer = req.file.buffer;
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

        try{
          const structuredData = JSON.parse(completion.choices[0].message.content);
          res.json({ data: structuredData })
        } 
        catch (parseError) {
          throw new Error('Invalid response format from AI service');
        }    
    } 
    catch (error) {
      handleError(error, res);
    }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});