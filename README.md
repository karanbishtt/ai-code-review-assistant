# 🚀 AI Code Review Assistant

A full-stack AI-powered code review platform built using Flask, React, and Google Gemini AI.

The system allows multiple users to register, authenticate securely using JWT, and receive structured AI-generated feedback on their submitted code.

---

## 🌟 Key Features

- 🔐 Multi-user registration & login
- 🔑 JWT-based secure authentication
- 🔒 Secure password hashing (Werkzeug)
- 🤖 AI-powered code review (Gemini integration)
- 🧠 Intelligent structured feedback
- 🛡 AI fallback mechanism for reliability
- 📋 Copy-to-clipboard feedback
- ⌨ Typing animation for AI response
- 🌀 Loading spinner during analysis
- 🎨 Modern, responsive UI
- 🧩 Modular backend architecture

---

## 🏗 Tech Stack

### 🔹 Backend
- Python
- Flask
- Flask-JWT-Extended
- Flask-SQLAlchemy
- Flask-CORS
- SQLAlchemy ORM
- Gunicorn (Production WSGI server)
- SQLite (Local Development)
- PostgreSQL (Production-ready)

### 🔹 Frontend
- React
- Axios (API calls)
- Component-based architecture
- Custom CSS with animations

### 🔹 AI Integration
- Google Gemini API
- Prompt-engineered structured responses
- Service-layer abstraction
- Fallback logic if AI service fails

---

## 🔐 Authentication Architecture

1. User registers with email & password  
2. Password is securely hashed before storage  
3. User logs in  
4. Backend generates JWT access token  
5. Protected routes require Bearer token  
6. Only authenticated users can access code review API  

JWT identity is tied to the user's unique database ID.

---

## 🤖 AI Review Workflow

1. Authenticated user submits code + language  
2. Backend verifies JWT token  
3. Request sent to AI service layer  
4. Gemini API analyzes code  
5. Structured improvement suggestions returned  
6. Frontend displays animated response  

If AI fails:
- Fallback response is generated
- System remains stable

---

## 📂 Project Structure

ai-code-review-assistant/
│
├── backend/
│   ├── app.py
│   ├── models.py
│   ├── extensions.py
│   ├── routes/
│   │   ├── auth.py
│   │   └── review.py
│   ├── services/
│   │   └── ai_service.py
│   ├── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Dashboard.js
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.js
│
├── .gitignore
├── README.md
└── agents.md

---

## 🧠 Key Technical Decisions

- Used JWT for stateless authentication
- Separated AI logic into dedicated service layer
- Implemented fallback logic for reliability
- Used modular Flask Blueprint architecture
- Designed for cloud deployment compatibility
- Production-ready WSGI server (Gunicorn)

---

## 🚀 How To Run Locally

### Backend Setup

cd backend  
python3 -m venv venv  
source venv/bin/activate  
pip install -r requirements.txt  
python app.py  

Backend runs at:  
http://127.0.0.1:5000  

---

### Frontend Setup

cd frontend  
npm install  
npm start  

Frontend runs at:  
http://localhost:3000  

---

## 🔧 Environment Variables

Create a `.env` file inside the backend directory:

SECRET_KEY=your_secret_key  
JWT_SECRET_KEY=your_jwt_secret_key  
GEMINI_API_KEY=your_gemini_api_key  
DATABASE_URL=your_database_url (for production)  

---

## ⚠️ Risks & Considerations

- AI output may vary depending on prompt quality  
- Token expiration must be handled in production  
- Rate limiting recommended for public deployment  
- Environment variables must never be committed  

---

## 🔮 Future Enhancements

- Review history per user  
- Code complexity scoring  
- AI model switching  
- Role-based access control  
- Rate limiting & abuse protection  
- Logging & monitoring  
- Docker containerization  
- Full cloud deployment pipeline  

---

## 🎥 Walkthrough Covers

- System architecture  
- Authentication flow  
- AI integration strategy  
- Technical design decisions  
- Risk handling  
- Extension & scalability approach  

---

## 👨‍💻 Author

Karan Singh Bisht  
B.Tech CSE | Full-Stack Developer | AI Enthusiast