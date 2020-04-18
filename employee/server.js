const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const moment = require("moment")

const events = [
    {
      start:  moment().toDate(),
      end:    moment().add(1, "days").toDate(),
      title:  "Felipe is testing Some title"
    },
    {
      start:  moment().subtract(2, "hours").toDate(),
      end:    moment().toDate(),
      title:  "Meeting about the project"
    },
    {
      start:  moment().toDate(),
      end:    moment().toDate(),
      title:  "Take care of the baby.",
      allDay: true,
    }
]

app.use(express.static(path.join(__dirname, 'build')));
app.get('/getEvents', (req, res) => res.send({ events: events }));
app.get('/ping', (req, res) => res.send({reponseObject: 'pong'}));
app.get('/', (req, res) =>  res.sendFile(path.join(__dirname, 'build', 'index.html')));

app.listen(process.env.PORT || 8080);