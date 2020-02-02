const express = require('express');
const router = express.Router();
const fs = require('fs');
const json = express.json;
const path = './messages';

let fiveLastMessages = [];
let messagesLastMessages = [];
let allFilesName = [];

router.get('/', (req, res) => {

  fs.readdir(path, (err, files) => {
    files.forEach(file => {
      allFilesName.push(file);
    });

    if (allFilesName.length > 5) {
      messagesLastMessages = allFilesName.slice(-5);
    } else {
      messagesLastMessages = allFilesName.slice(-allFilesName.length);
    }

    messagesLastMessages.forEach(message => {
      fs.readFile(`${path}/${message}`, 'utf8', (err, res) => {
        if (err) {
          throw err;
        }
        fiveLastMessages.push(JSON.parse(res));
      })
    })
  })

  res.send(fiveLastMessages);
  fiveLastMessages = [];
  messagesLastMessages = [];
  allFilesName = [];
});


router.get('/:id', (req, res) => {
  res.send(req.params.id);
});


router.post('/', json(), (req, res) => {
  const date = new Date().toISOString();
  const fileName = `${date}.txt`;

  const message =  {message: req.body.message, datetime: date};

  const objectForWrite = JSON.stringify(message);

  fs.writeFile(`${path}/${fileName}`, objectForWrite, (err) => {
    if (err) {
      console.error(err);
    }
    console.log('File was saved!');
  });

  res.send(message);
});

module.exports = router;