// Import necessary modules
import { createClient } from 'redis';
import { promisify } from 'util';

// Create a Redis client
const client = createClient();

// Promisify the get method of the Redis client
const getAsync = promisify(client.get).bind(client);

// Event listener for connection errors
client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.toString());
});

// Event listener for successful connection
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Function to set a new school value in Redis
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

// Async function to display the value for a given school key
async function displaySchoolValue(schoolName) {
  try {
    const value = await getAsync(schoolName);
    console.log(`Value for ${schoolName}:`, value);
  } catch (err) {
    console.log(`Error retrieving value for ${schoolName}:`, err.toString());
  }
}

// Call the functions
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');

