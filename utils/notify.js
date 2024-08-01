const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.MAIL_ID, 
    pass: process.env.MAIL_PASS 
  }
});

async function sendTaskNotification(userEmail, task) {
    const mailOptions = {
      from: process.env.MAIL_ID, 
      to: userEmail, 
      subject: 'New Task Assigned', 
      text: `A new task has been assigned to you:
  
      Title: ${task.title}
      Description: ${task.description}
      Due Date: ${new Date(task.dueDate).toLocaleDateString()}
  
      Please check your tasks for more details.`
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('Notification email sent to:', userEmail);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async function sendCompletedTaskNotification(userEmail, task) {
    const mailOptions = {
      from: process.env.MAIL_ID, 
      to: userEmail, 
      subject: 'Task completed', 
      text: `The assignee ${task.assignee.name} has completed the task:
  
      Title: ${task.title}
      Description: ${task.description}
      Due Date: ${new Date(task.dueDate).toLocaleDateString()}
  
      Please check your tasks for more details.`
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('Notification email sent to:', userEmail);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
  
  module.exports = {
    sendTaskNotification,
    sendCompletedTaskNotification
  }