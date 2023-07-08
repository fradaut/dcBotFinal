import { connect } from 'mongoose';

const connectDatabase = async () => {
  await connect(process.env.MONGO_URI as string);

  console.log('Connected to database');
};

export default connectDatabase;
