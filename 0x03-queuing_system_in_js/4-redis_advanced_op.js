#!/usr/bin/env yarn dev
import { createClient, print } from 'redis';

// Create a Redis client
const client = createClient();

// Event listener for connection errors
client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.toString());
});

// Function to update a hash in Redis
const updateHash = (hashName, fieldValues) => {
  // Iterate through the fields and values in the provided object
  for (const [field, value] of Object.entries(fieldValues)) {
    // Use HSET to set the field-value pair in the hash
    client.HSET(hashName, field, value, print);
  }
};

// Function to print the contents of a hash in Redis
const printHash = (hashName) => {
  // Use HGETALL to retrieve the entire hash
  client.HGETALL(hashName, (_err, reply) => console.log(reply));
};

// Main function
function main() {
  // Object with field-value pairs for the hash
  const hashObj = {
    Portland: 50,
    Seattle: 80,
    'New York': 20,
    Bogota: 20,
    Cali: 40,
    Paris: 2,
  };

  // Update the 'HolbertonSchools' hash with the values from the object
  updateHash('HolbertonSchools', hashObj);

  // Print the contents of the 'HolbertonSchools' hash
  printHash('HolbertonSchools');
}

// Event listener for successful connection
client.on('connect', () => {
  console.log('Redis client connected to the server');
  
  // Call the main function once the client is connected
  main();
});

