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

async function sendTaskDeletionNotification(assigneeEmail, task) {
    const mailOptions = {
        from: process.env.MAIL_ID,
        to: assigneeEmail,
        subject: 'Task Deleted',
        text: `The creator ${task.creator.name} has deleted the task assigned to you:

        Title: ${task.title}
        Description: ${task.description}
        Due Date: ${new Date(task.dueDate).toLocaleDateString()}

        Please contact the creator if you have any questions.`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Notification email sent to:', assigneeEmail);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

async function sendOtpNotification(userMail, user) {
    const mailOptions = {
        from: process.env.MAIL_ID,
        to: userMail,
        subject: 'OTP Verification',
        text: `Your OTP for password reset is: ${user.resetOtp}. Do not share your OTP with anyone else. Validity 5 Mins`
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP email sent to:', userMail);
    } catch (error) {
        console.error('Error sending OTP email:', error);
    }

}

module.exports = {
    sendTaskNotification,
    sendCompletedTaskNotification,
    sendTaskDeletionNotification,
    sendOtpNotification
}