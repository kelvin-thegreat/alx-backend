// Import the createQueue function from the 'kue' library
import { createQueue } from 'kue';

// Create a default job queue
const queue = createQueue();

// Function to simulate sending a notification
const sendNotification = (phoneNumber, message) => {
  console.log(
    `Sending notification to ${phoneNumber},`,
    'with message:',
    message,
  );
};

// Define a processing function for the 'push_notification_code' job
queue.process('push_notification_code', (job, done) => {
  // Extract data from the job and use it to send a notification
  sendNotification(job.data.phoneNumber, job.data.message);
  
  // Mark the job as done, indicating successful processing
  done();
});

