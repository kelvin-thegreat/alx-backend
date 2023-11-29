// Import the createQueue function from the 'kue' library
import { createQueue } from 'kue';

// Array of job information objects
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account',
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account',
  },
];
// Create a job queue named 'push_notification_code_2'
const queue = createQueue({ name: 'push_notification_code_2' });

// Iterate through each job information object and create jobs in the queue
for (const jobInfo of jobs) {
  // Create a job with specific data
  const job = queue.create('push_notification_code_2', jobInfo);

  // Event listeners for the job
  job
    .on('enqueue', () => {
      // Log when the job is enqueued
      console.log('Notification job created:', job.id);
    })
    .on('complete', () => {
      // Log when the job is completed successfully
      console.log('Notification job', job.id, 'completed');
    })
    .on('failed', (err) => {
      // Log when the job fails
      console.log('Notification job', job.id, 'failed:', err.message || err.toString());
    })
    .on('progress', (progress, _data) => {
      // Log job progress
      console.log('Notification job', job.id, `${progress}% complete`);
    });

  // Save the job to the queue
  job.save();
}

