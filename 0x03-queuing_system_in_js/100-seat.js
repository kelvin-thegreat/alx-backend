import express from 'express';
import { createClient } from 'redis';
import { createQueue } from 'kue';
import { promisify } from 'util';

const client = createClient();
const queue = createQueue();
const promisifiedGet = promisify(client.get).bind(client);
const promisifiedSet = promisify(client.set).bind(client);

const reserveSeat = async (number) => {
  await promisifiedSet('available_seats', number);
};

const getCurrentAvailableSeats = async () => {
  const seats = await promisifiedGet('available_seats');
  return parseInt(seats, 10);
};

const initializeSeats = async () => {
  await reserveSeat(50);
};

const app = express();
const PORT = 1245;

let reservationEnabled = true;

// Initialize available seats
initializeSeats();

// Route to get the number of available seats
app.get('/available_seats', async (_, res) => {
  try {
    const numberOfAvailableSeats = await getCurrentAvailableSeats();
    res.json({ numberOfAvailableSeats });
  } catch (error) {
    console.error('Error getting available seats:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to reserve a seat
app.get('/reserve_seat', async (_, res) => {
  try {
    if (!reservationEnabled) {
      res.json({ status: 'Reservation are blocked' });
      return;
    }

    const currentAvailableSeats = await getCurrentAvailableSeats();
    if (currentAvailableSeats > 0) {
      await reserveSeat(currentAvailableSeats - 1);

      if (currentAvailableSeats === 1) {
        reservationEnabled = false;
      }

      const job = queue.create('reserve_seat').save();
      res.json({ status: 'Reservation in process' });
    } else {
      res.json({ status: 'Not enough seats available' });
    }
  } catch (error) {
    console.error('Error reserving seat:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to process the queue and decrease available seats
app.get('/process', async (_, res) => {
  try {
    res.json({ status: 'Queue processing' });

    queue.process('reserve_seat', async (job, done) => {
      const currentAvailableSeats = await getCurrentAvailableSeats();
      if (currentAvailableSeats >= 0) {
        console.log(`Seat reservation job ${job.id} completed`);
        done();
      } else {
        console.error(`Seat reservation job ${job.id} failed: Not enough seats available`);
        done(new Error('Not enough seats available'));
      }
    });
  } catch (error) {
    console.error('Error processing queue:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Main route to display the right number of seats
app.get('/', async (_, res) => {
  try {
    const numberOfAvailableSeats = await getCurrentAvailableSeats();
    res.json({ numberOfAvailableSeats });
  } catch (error) {
    console.error('Error getting available seats:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`API available on localhost port ${PORT}`);
});

export default app;

