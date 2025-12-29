import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined!: auth service');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined: auth service');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('connected to Mongodb: auth service');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  app.listen(3000, () => {
    console.log('listening on port 3000: auth service');
  });
};

start();
