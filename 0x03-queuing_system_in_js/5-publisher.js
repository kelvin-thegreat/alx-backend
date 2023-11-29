// Import the createClient function from the 'redis' library
import { createClient } from 'redis';

// Create a Redis client
const client = createClient();

// Event listener for connection errors
client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.toString());
});

// Function to publish a message after a specified time
const publishMessage = (message, time) => {
  // Set a timeout to delay the execution of the message publishing
  setTimeout(() => {
    // Log a message before publishing
    console.log(`About to send ${message}`);
    
    // Publish the message to the 'holberton school channel'
    client.publish('holberton school channel', message);
  }, time);
};

// Event listener for successful connection
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Publish several messages with different delays
publishMessage('Holberton Student #1 starts course', 100);
publishMessage('Holberton Student #2 starts course', 200);
publishMessage('KILL_SERVER', 300);
publishMessage('Holberton Student #3 starts course', 400);

