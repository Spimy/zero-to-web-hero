import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import notesRoute from './routes/notes.route';
import usersRoute from './routes/users.route';

dotenv.config();
const app = express();

// Setup global middlewares
app.use(cors());
app.use(express.json());

// Register routes
app.use('/notes', notesRoute);
app.use('/users', usersRoute);

const main = async () => {
  const port = Number(process.env.PORT);

  // Attempt to connect to MongoDB
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB.'))
    .catch(() => console.error('Could not connect to MongoDB. Check connection settings.'));

  // Create HTTP server using express app
  app.listen(port, () => console.log(`Listening on port: ${port}.`));
  app.on('error', () => console.error(`Something went wrong while listening on port: ${port}.`));
};

main();
