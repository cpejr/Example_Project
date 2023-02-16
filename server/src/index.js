import 'dotenv/config';
import mongoConfig from './config/mongo.js';
import logger from './config/logger.js';

process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception', err);
  process.exit(1);
});
import app from './app.js';

const PORT = process.env.PORT || 3333;
app.listen(PORT, async () => {
  try {
    await mongoConfig();
    logger.info(`✅ Server started at port ${PORT}`);
  } catch (err) {
    logger.error(err.message, err);
  }
});

process.on('unhandledRejection', (err) => {
  logger.error('Unhandled rejection', err);
  process.exit(1);
});
