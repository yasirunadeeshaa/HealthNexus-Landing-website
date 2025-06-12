# React + (TypeScript+SWC) + Vite
===================================================================
# Create React project with Vite
npm create vite@latest healthcare-system -- --template react

# Navigate to project directory
cd healthcare-system

# Install dependencies
npm install

# Install Tailwind CSS and its peer dependencies
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind CSS
npx tailwindcss init -p

-------------------------------------------------------------------

# Core dependencies
npm install react-router-dom axios js-cookie date-fns lucide-react react-hot-toast socket.io-client

# Redux for state management
npm install @reduxjs/toolkit react-redux

# Form handling
npm install react-hook-form yup @hookform/resolvers

# UI components
npm install @headlessui/react clsx

# Additional useful packages
npm install react-dropzone recharts

npm install -D @types/js-cookie
npm install bootstrap react-bootstrap
npm install -D sass
====================================================================

# Healthcare System - Frontend

A modern healthcare appointment booking system built with React, TypeScript, and Bootstrap.

## 🏥 Overview

This is the frontend application for a comprehensive healthcare management system that allows patients to find doctors, book appointments, manage medical records, and conduct video consultations.

## ✨ Features

- **User Authentication**: Secure login and registration system
- **Doctor Search**: Find doctors by specialization, location, and availability
- **Appointment Booking**: Easy online appointment scheduling
- **Video Consultations**: Integrated telemedicine capabilities
- **Medical Records**: Secure storage and management of health records
- **Real-time Updates**: WebSocket integration for live notifications
- **Responsive Design**: Mobile-friendly interface with Bootstrap

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (with SWC for fast compilation)
- **Styling**: Bootstrap 5 + Custom CSS
- **Routing**: React Router DOM v6
- **State Management**: Redux Toolkit
- **Form Handling**: React Hook Form with Yup validation
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Real-time**: Socket.io Client
- **Charts**: Recharts
- **File Upload**: React Dropzone

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher)

=======================================================================

🏃‍♂️ Available Scripts
bash# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting (if configured)
npm run lint


📦 Dependencies
Core Dependencies
json{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.x.x",
  "bootstrap": "^5.3.x",
  "react-bootstrap": "^2.x.x"
}
State Management & Forms
json{
  "@reduxjs/toolkit": "^2.x.x",
  "react-redux": "^9.x.x",
  "react-hook-form": "^7.x.x",
  "yup": "^1.x.x",
  "@hookform/resolvers": "^3.x.x"
}
API & Real-time Communication
json{
  "axios": "^1.x.x",
  "socket.io-client": "^4.x.x",
  "js-cookie": "^3.x.x"
}
UI Components & Utilities
json{
  "lucide-react": "^0.x.x",
  "react-hot-toast": "^2.x.x",
  "date-fns": "^2.x.x",
  "recharts": "^2.x.x",
  "react-dropzone": "^14.x.x"
}
Development Dependencies
json{
  "@types/react": "^18.x.x",
  "@types/react-dom": "^18.x.x",
  "@types/js-cookie": "^3.x.x",
  "@vitejs/plugin-react-swc": "^3.x.x",
  "typescript": "^5.x.x",
  "vite": "^5.x.x"
}