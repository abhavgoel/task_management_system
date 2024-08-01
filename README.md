# Task Management System

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)


## Introduction
The Task Management System is a web application designed to help users manage tasks efficiently. Users can create tasks, assign them to others, update statuses, and receive notifications. This system is built using Node.js, Express, EJS, and MongoDB.

## Features
- User authentication and authorization
- Task creation, assignment, and management
- Task status updates
- Attachment management
- Notifications via email
- Task filtering and sorting

## Installation

### Prerequisites
- Node.js
- MongoDB
- Nodemailer setup (SMTP configuration)

### Steps
1. Clone and setup the project:
   ```bash
   git clone https://github.com/yourusername/task-management-system.git
   cd task-management-system
   npm install
   ```
2. Setup .env file:  
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=mongodb://localhost:27017/task_management
   MAIL_ID=your-email@example.com
   MAIL_PASS=your-email-password
   JWT_SECRET=your-secret-key
   ```

3. Start the server:
   ```bash
   npm start
   ```
## Usage

### Running the Application
- Open your browser and go to [http://localhost:8000](http://localhost:8000)

### User Authentication
- Register a new user or log in with existing credentials

### Task Management
- Create a new task
- Assign the task to another user
- Update task details and status
- Delete tasks

### Notifications
- Email notifications are sent when a task is created or completed


