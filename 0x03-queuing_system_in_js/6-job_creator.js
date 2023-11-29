// Import the createQueue function from the 'kue' library
import { createQueue } from 'kue';

// Create a job queue named 'push_notification_code'
const queue = createQueue({ name: 'push_notification_code' });

// Create a job with specific data
const job = queue.create('push_notification_code', {
  phoneNumber: '0714820808',
  message: 'Account registered',
});

// Event listeners for the job
job
  .on('enqueue', () => {
    // Log when the job is enqueued
    console.log('Notification job created:', job.id);
  })
  .on('complete', () => {
    // Log when the job is completed successfully
    console.log('Notification job completed');
  })
  .on('failed attempt', () => {
    // Log when the job fails an attempt
    console.log('Notification job failed');
  });

// Save the job to the queue
job.save();

