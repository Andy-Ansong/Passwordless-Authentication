import * as dotenv from 'dotenv';
dotenv.config();
import mongoose, { ConnectOptions } from 'mongoose';

const mongoUrl: string = process.env.MONGODB_URL as string;

mongoose
  .connect(mongoUrl, {})
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error('Could not connect to database:', err);
  });

const db = mongoose.connection;

export default db;
