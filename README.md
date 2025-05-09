# Awesome Resume Builder

A modern resume builder application that uses AI to help you create professional resumes from your existing PDF resume or from scratch.

## Features

- Upload your existing resume PDF
- AI-powered resume parsing and structuring
- Multiple resume templates
- Download as PDF
- Firebase authentication

## Tech Stack

- Frontend: React, Redux, TailwindCSS, React Router, Vite
- Backend: Express.js, OpenAI API
- Authentication: Firebase
- PDF Processing: pdf-parse, @react-pdf/renderer


##Glimpses from the app

![Screenshot (379)](https://github.com/user-attachments/assets/03984307-e1a6-4a4c-a2c0-38cfe8ba01ef)
![Screenshot (383)](https://github.com/user-attachments/assets/666f9524-4704-492c-bbbb-cb85cb1fc998)
![Screenshot (376)](https://github.com/user-attachments/assets/1bab74eb-7ef8-4b40-976b-8b1899d05357)
![Screenshot (377)](https://github.com/user-attachments/assets/c7ead9dc-2036-4375-91d5-bd534ac908de)
![Screenshot (381)](https://github.com/user-attachments/assets/b0d365aa-e476-4dc8-92c4-043d49256d81)
![Screenshot (380)](https://github.com/user-attachments/assets/d092c8f6-2d2a-4bbf-a3f0-e81d98f6e876)
![Screenshot (378)](https://github.com/user-attachments/assets/4dca8ab3-de42-4ab2-8a79-032caad60409)


## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key
- Firebase project

### Environment Setup

1. **Frontend Environment Variables**

   Create a `.env` file in the root directory with the following variables:

   ```
   VITE_API_URL=http://localhost:5000
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   ```

2. **Backend Environment Variables**

   Create a `.env` file in the `backend` directory with the following variables:

   ```
   PORT=5000
   OPENAI_API_KEY=your_openai_api_key
   ```

### Installation and Running

#### Frontend

1. Install dependencies:
   ```bash
    npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. The application will be available at `http://localhost:5173`

#### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   # or
   node server.js
   ```

4. The backend API will be available at `http://localhost:5000`
