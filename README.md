# TaskMaster - A  To-Do List App

## Overview

TaskMaster is a full-stack task management app that allows users to:

* Sign in with Google OAuth
* Create, update, delete, and mark tasks as completed
* Assign tasks to users
* Set start/end dates and times for tasks
* Toggle light/dark theme

## Tech Stack

* Frontend: React.js
* Backend: Node.js, Express.js
* Database: MongoDB (with Mongoose)
* Authentication: Google OAuth 2.0 via Passport.js
* Deployment:

  * Frontend: Vercel
  * Backend: Render
  * Database: MongoDB Atlas

## Features

* Secure Google Sign-In using OAuth 2.0
* Persistent tasks per user
* Task filtering: all, completed, in-progress
* Responsive and visually clean UI
* Support for theme switching
* Session management using cookies

## Installation Instructions (for local setup)

### Backend (Node.js + Express)

```bash
# Clone the repo
https://github.com/<your-username>/taskmaster-app.git
cd taskmaster-app/server

# Install dependencies
npm install

# Create a .env file with the following:
PORT=5000
MONGO_URI=mongodb+srv://<your-mongo-user>:<password>@cluster.mongodb.net/taskmaster?retryWrites=true&w=majority
SESSION_SECRET=your_random_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-backend-domain/auth/google/callback

# Run the server
npm start
```

### Frontend (React)

```bash
cd ../client
npm install

# Create a .env file with the following:
VITE_API_URL=https://your-backend-domain

# Run the React app
npm run dev
```

## Deployment URLs

* Frontend (Vercel): [https://to-do-list-sigma-nine-70.vercel.app](https://to-do-list-sigma-nine-70.vercel.app)
* Backend (Render): [https://to-do-list-1ttx.onrender.com](https://to-do-list-1ttx.onrender.com)
* Todolist:(http://to-do-list-sigma-nine-70.vercel.app)

## Authorized OAuth URLs

* Authorized JavaScript origins:

  * [https://to-do-list-sigma-nine-70.vercel.app](https://to-do-list-sigma-nine-70.vercel.app)
* Authorized redirect URIs:

  * [https://to-do-list-1ttx.onrender.com/auth/google/callback](https://to-do-list-1ttx.onrender.com/auth/google/callback)

## Assumptions

* Only authenticated users can add and view tasks
* Multiple task can be assigned to a user
* Google OAuth handles session via cookies (withCredentials enabled)

##  Video

 Demo : [https://youtu.be/ec9-xzWh-Rk?si=VQTbGfYcVBNFrB3i]

## Architecture Diagram
[Blank diagram.pdf](https://github.com/user-attachments/files/21089183/Blank.diagram.pdf)

## License


MIT

---

This project is a part of a hackathon run by [https://www.katomaran.com](https://www.katomaran.com)
