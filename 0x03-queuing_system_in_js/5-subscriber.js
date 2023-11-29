// Import the createClient function from the 'redis' library
import { createClient } from 'redis';

// Create a Redis client
const client = createClient();

// Define a constant for the exit message
const EXIT_MSG = 'KILL_SERVER';

// Event listener for connection errors
client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.toString());
});

// Event listener for successful connection
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Subscribe to the 'holberton school channel'
client.subscribe('holberton school channel');

// Event listener for incoming messages on the subscribed channel
client.on('message', (_err, msg) => {
  // Log the received message to the console
  console.log(msg);

  // Check if the received message is the exit message
  if (msg === EXIT_MSG) {
    // Unsubscribe from the channel
    client.unsubscribe();
    
    // Quit the Redis client connection
    client.quit();
  }
});

