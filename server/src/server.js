import 'dotenv/config';
import app from './app.js';
import mongoConfig from './config/mongo.js';
import socketConfig from './config/socket.js';

const port = process.env.PORT || 3333;
const server = socketConfig(app);
server.listen(port, () => {
  mongoConfig()
    .then(() => {
      console.log('✅ Established connection with mongodb');
      console.log(`✅ Server started at port ${port}`);
    })
    .catch((err) => console.error(err));
});
