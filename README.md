# Task Management System

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)


## Introduction
The Task Management System is a web application designed to help users manage tasks efficiently. Users can create tasks, assign them to others, update statuses, and receive notifications. This system is built using Node.js, Express, EJS, and MongoDB. The whole system is dynamically interconnected. The User landing page also provides the Tasks that are due in the next week, so that you can prioritize the tasks near deadlines.

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

## Interface

### Landing Page
  ![image](https://github.com/user-attachments/assets/4b0eed28-e31a-4293-bebc-1032fccc06ef)

### Login
   ![image](https://github.com/user-attachments/assets/f9762320-466e-41c3-a746-ffe48678e13e)

### Signup
   ![image](https://github.com/user-attachments/assets/022d25cb-556b-4c97-9b0d-8c28bee0b04a)

### User landing page after Login
   ![image](https://github.com/user-attachments/assets/d4bbebde-64e0-4563-a25c-e892eaf5fdfa)

### Personal tasks for users
   ![image](https://github.com/user-attachments/assets/24758c9e-cf02-4f53-baa6-8419b68975d8)

### Tasks assigned to users
   ![image](https://github.com/user-attachments/assets/52e0cf07-5d01-4ded-ae61-20f58f437d86)

### Task History
   ![image](https://github.com/user-attachments/assets/08dbee91-5dbf-4da9-9083-7f10c377b57f)

### Create Task
   ![image](https://github.com/user-attachments/assets/839bbcb0-6fc3-4f82-8857-aac04efa0f52)










