const express = require('express');
const messages = require('./messages');
const cors =require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/messages', messages);
const port = 8000;

app.listen(port, () => {
  console.log(`Server started on ${port} port!`);
});

