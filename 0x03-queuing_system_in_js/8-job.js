// Import the Queue and Job classes from the 'kue' library
import { Queue, Job } from 'kue';

/**
 * Creates push notification jobs from the array of job information.
 * @param {Job[]} jobs - An array of job information objects.
 * @param {Queue} queue - The Kue job queue instance.
 */
export const createPushNotificationsJobs = (jobs, queue) => {
  // Ensure 'jobs' is an array
  if (!(jobs instanceof Array)) {
    throw new Error('Jobs is not an array');
  }

  // Iterate through each job information object and create jobs in the queue
  for (const jobInfo of jobs) {
    // Create a job with specific data
    const job = queue.create('push_notification_code_3', jobInfo);

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
};

// Export the function as the default export
export default createPushNotificationsJobs;

