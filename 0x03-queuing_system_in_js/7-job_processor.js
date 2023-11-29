// Import the createQueue and Job classes from the 'kue' library
import { createQueue, Job } from 'kue';

// Array of blacklisted phone numbers
const BLACKLISTED_NUMBERS = ['4153518780', '4153518781'];

// Create a job queue
const queue = createQueue();

/**
 * Sends a push notification to a user.
 * @param {String} phoneNumber - The phone number to send the notification to.
 * @param {String} message - The message to be included in the notification.
 * @param {Job} job - The Kue job object.
 * @param {Function} done - Callback function to indicate completion of the job.
 */
const sendNotification = (phoneNumber, message, job, done) => {
  // Variables to track progress
  let total = 2, pending = 2;
  
  // Set up an interval to simulate sending notifications
  let sendInterval = setInterval(() => {
    // Update job progress
    if (total - pending <= total / 2) {
      job.progress(total - pending, total);
    }
    
    // Check if the phone number is blacklisted
    if (BLACKLISTED_NUMBERS.includes(phoneNumber)) {
      done(new Error(`Phone number ${phoneNumber} is blacklisted`));
      clearInterval(sendInterval);
      return;
    }

    // Check if all notifications are sent
    if (total === pending) {
      console.log(
        `Sending notification to ${phoneNumber},`,
        `with message: ${message}`,
      );
    }

    // Decrement the pending count and call the 'done' callback when all are sent
    --pending || done();
    
    // Clear the interval when all notifications are sent
    pending || clearInterval(sendInterval);
  }, 1000);
};

// Define a processing function for the 'push_notification_code_2' job
queue.process('push_notification_code_2', 2, (job, done) => {
  // Call the sendNotification function with job data and the 'done' callback
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});

