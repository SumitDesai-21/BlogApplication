<!-- <p align="center">
  <img src="/client/src/assets/favicon.png" alt="Gemblog logo" />
</p> -->
<h2 align="center">GemBlog – AI-Powered Blogging Platform</h2>

<p align="center">
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-0DBE70?style=flat" alt="license: MIT">
  </a>
  	<img src="https://img.shields.io/github/last-commit/SumitDesai-21/Gemblog?style=flat&logo=git&logoColor=white&color=50C878" alt="last-commit">
  	<img src="https://img.shields.io/github/languages/top/SumitDesai-21/Gemblog?style=flat&color=0080ff" alt="repo-top-language">
  	<img src="https://img.shields.io/github/languages/count/SumitDesai-21/Gemblog?style=flat&color=0080ff" alt="repo-language-count">
</p>

GemBlog is a full-stack blogging platform that enables users to create, manage, and publish blogs with AI-assisted content generation. The application features secure user authentication, image uploads, comment moderation, and a modern responsive interface.

## Live Demo

Frontend: [gemblog-frontend](https://gem-blog.onrender.com)

Backend API: [gemblog-backend](blogapplication-grio.onrender.comapi/blog/all)

---

## Features

### Authentication & Security

* User Registration and Login
* JWT-based Authentication
* Password Hashing using bcrypt
* Protected Routes and Authorization

### Blog Management

* Create, Publish, and Delete Blogs
* Blog Ownership Verification
* Rich Text Blog Editor
* Markdown Support
* Blog Categories

### AI Integration

* Generate Blog Content using Gemini AI
* AI-assisted content creation workflow

### Media Handling

* Image Uploads using ImageKit
* Optimized image delivery

### Community Features

* Comment System
* Comment Approval and Moderation
* Blog Search and Filtering

### User Experience

* Responsive Design
* Modern UI built with React
* Real-time Notifications using React Hot Toast

---

## Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT (JSON Web Tokens)
* bcrypt

### AI & Media Services

* Gemini API
* ImageKit

### Deployment

* Render

---

## Project Architecture

User → React Frontend → Express API → MongoDB

User → React Frontend → Gemini API (Content Generation)

User → React Frontend → ImageKit (Image Upload & Storage)

---

## Environment Variables

### Backend (.env)

```env
MONGODB_URI=
JWT_SECRET=
GEMINI_API_KEY=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
```

### Frontend (.env)

```env
VITE_BASE_URL=
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/SumitDesai-21/GemBlog.git
cd GemBlog
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## Future Improvements

* User Profiles
* Blog Likes and Bookmarks
* Rich Role-Based Access Control
* Email Verification
* Draft Auto Save
* Blog Analytics Dashboard

---

## Key Learning Outcomes

* Authentication and Authorization using JWT
* Secure Password Storage with bcrypt
* REST API Development with Express
* MongoDB Relationships using References and Populate
* Third-Party Service Integration (Gemini AI & ImageKit)
* Full-Stack Deployment on Render
* File Upload Handling with Multer

---

## Author

Sumit Desai
