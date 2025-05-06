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

// Route: Handle PDF upload and extract text
app.post('/api/upload', upload.single('resume'), async (req, res) => {
    try {
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
          "work_experience": [],
          "skills": []
        }
        Resume Text:
        ${extractedText}
        `;

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        });

        const structuredData = completion.choices[0].message.content;
        res.json({ data: JSON.parse(structuredData) });
    } catch (error) {
      console.error('Full error object:', error);

      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } 
      else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
  
      res.status(500).json({ error: 'Failed to process resume' });
    }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});