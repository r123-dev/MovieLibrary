// Requiring module
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const routes = require('./api/routes');

// Creating express object and configure server port
const server = express();
const PORT = process.env.PORT || 8000;

server.use(express.json());
server.use(cookieParser());
server.use(cors());
server.use(routes);

const uri = `mongodb+srv://rohanmourya879:vivek123@cluster0.upxigtg.mongodb.net/Vivek`;

mongoose
  .connect(uri)
  .then(() => {
    server.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error(error));

module.exports = server;
