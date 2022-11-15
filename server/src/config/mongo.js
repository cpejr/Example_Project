import mongoose from 'mongoose';

export default function mongoConfig() {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_SERVER}/${process.env.MONGO_DATABASE}?${process.env.MONGO_OPTIONS}`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    mongoose.connection.on('error', (error) => {
      const err = new Error(
        `❌ Failed to connect to mongoDB. Error: ${error}.`
      );
      reject(err);
    });

    mongoose.connection.once('open', () => {
      resolve();
    });
  });
}
