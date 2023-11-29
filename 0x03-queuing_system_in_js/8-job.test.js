// Import the necessary testing libraries and modules
import sinon from 'sinon';
import { expect } from 'chai';
import { createQueue } from 'kue';
import createPushNotificationsJobs from './8-job.js';

// Test suite for the createPushNotificationsJobs function
describe('createPushNotificationsJobs', () => {
  // Create a spy for console.log
  const BIG_BROTHER = sinon.spy(console);

  // Create a Kue job queue for testing
  const QUEUE = createQueue({ name: 'push_notification_code_test' });

  // Setup before running the test suite
  before(() => {
    // Enter Kue test mode
    QUEUE.testMode.enter(true);
  });

  // Cleanup after running the test suite
  after(() => {
    // Clear Kue test mode
    QUEUE.testMode.clear();
    // Exit Kue test mode
    QUEUE.testMode.exit();
  });

  // Cleanup after each test
  afterEach(() => {
    // Reset the history of console.log spy
    BIG_BROTHER.log.resetHistory();
  });

  // Test case: createPushNotificationsJobs throws an error if jobs is not an array
  it('displays an error message if jobs is not an array', () => {
    expect(
      createPushNotificationsJobs.bind(createPushNotificationsJobs, {}, QUEUE)
    ).to.throw('Jobs is not an array');
  });

  // Test case: createPushNotificationsJobs adds jobs to the queue with the correct type
  it('adds jobs to the queue with the correct type', (done) => {
    // Ensure the queue is initially empty
    expect(QUEUE.testMode.jobs.length).to.equal(0);

    // Define an array of job information objects
    const jobInfos = [
      {
        phoneNumber: '44556677889',
        message: 'Use the code 1982 to verify your account',
      },
      {
        phoneNumber: '98877665544',
        message: 'Use the code 1738 to verify your account',
      },
    ];

    // Call the createPushNotificationsJobs function
    createPushNotificationsJobs(jobInfos, QUEUE);

    // Ensure the queue has two jobs after the function call
    expect(QUEUE.testMode.jobs.length).to.equal(2);

    // Ensure the properties of the first job match the first jobInfo object
    expect(QUEUE.testMode.jobs[0].data).to.deep.equal(jobInfos[0]);
    // Ensure the type of the first job is correct
    expect(QUEUE.testMode.jobs[0].type).to.equal('push_notification_code_3');

    // Process the first job in the queue
    QUEUE.process('push_notification_code_3', () => {
      // Ensure console.log is called with the correct message
      expect(
        BIG_BROTHER.log
          .calledWith('Notification job created:', QUEUE.testMode.jobs[0].id)
      ).to.be.true;
      // Signal that the test is complete
      done();
    });
  });

  // Test case: createPushNotificationsJobs registers the progress event handler for a job
  it('registers the progress event handler for a job', (done) => {
    // Add a listener for the 'progress' event on the first job in the queue
    QUEUE.testMode.jobs[0].addListener('progress', () => {
      // Ensure console.log is called with the correct progress message
      expect(
        BIG_BROTHER.log
          .calledWith('Notification job', QUEUE.testMode.jobs[0].id, '25% complete')
      ).to.be.true;
      // Signal that the test is complete
      done();
    });

    // Emit the 'progress' event on the first job in the queue
    QUEUE.testMode.jobs[0].emit('progress', 25);
  });

  // Test case: createPushNotificationsJobs registers the failed event handler for a job
  it('registers the failed event handler for a job', (done) => {
    // Add a listener for the 'failed' event on the first job in the queue
    QUEUE.testMode.jobs[0].addListener('failed', () => {
      // Ensure console.log is called with the correct failed message
      expect(
        BIG_BROTHER.log
          .calledWith('Notification job', QUEUE.testMode.jobs[0].id, 'failed:', 'Failed to send')
      ).to.be.true;
      // Signal that the test is complete
      done();
    });

    // Emit the 'failed' event on the first job in the queue with an error message
    QUEUE.testMode.jobs[0].emit('failed', new Error('Failed to send'));
  });

  // Test case: createPushNotificationsJobs registers the complete event handler for a job
  it('registers the complete event handler for a job', (done) => {
    // Add a listener for the 'complete' event on the first job in the queue
    QUEUE.testMode.jobs[0].addListener('complete', () => {
      // Ensure console.log is called with the correct completed message
      expect(
        BIG_BROTHER.log
          .calledWith('Notification job', QUEUE.testMode.jobs[0].id, 'completed')
      ).to.be.true;
      // Signal that the test is complete
      done();
    });

    // Emit the 'complete' event on the first job in the queue
    QUEUE.testMode.jobs[0].emit('complete');
  });
});
