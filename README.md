# Scalable Web App

A full-stack web application built with a modern tech stack, featuring a responsive frontend and a robust backend.

## 🚀 Features

- **User Authentication**: Secure signup and login functionality using JWT.
- **User Management**: Profile management and listing users.
- **Task Management**: Create, read, update, and delete tasks.
- **Responsive Design**: Built with React and TailwindCSS for a seamless mobile and desktop experience.
- **Scalable Architecture**: Backend powered by FastAPI and SQLModel for high performance and easy database interactions.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Styling**: TailwindCSS
- **State Management**: React Hooks
- **Routing**: React Router DOM (v7)
- **HTTP Client**: Axios

### Backend
- **Framework**: FastAPI
- **Database ORM**: SQLModel
- **Database Driver**: PostgreSQL
- **Authentication**: Python Jose (JWT), Passlib (Bcrypt)

## 📂 Project Structure

```
├── backend/            # FastAPI backend application
│   ├── routes/         # API routes (auth, users, tasks)
│   ├── models.py       # Database models
│   ├── main.py         # Entry point for the backend
│   └── requirements.txt # Python dependencies
└── frontend/           # React frontend application
    ├── src/            # Source code
    ├── public/         # Static assets
    └── package.json    # Node.js dependencies
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.9 or higher)
- PostgreSQL Database

### 1. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Set up environment variables:
Create a `.env` file in the `backend` directory and add your database credentials and secret keys.

Run the server:
```bash
uvicorn main:app --reload
```
The backend API will be available at `http://localhost:8000`.

### 2. Frontend Setup

Navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```
The application will be accessible at `http://localhost:5173`.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.
