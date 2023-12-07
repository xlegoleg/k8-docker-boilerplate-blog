const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;
  
  events.push(event);
  
  axios.post('http://posts-clusterip-srv:4000/events', event).catch((e) => console.error(e));
  axios.post('http://comments-clusterip-srv:4001/events', event).catch((e) => console.error(e));
  axios.post('http://query-clusterip-srv:4002/events', event).catch((e) => console.error(e));
  axios.post('http://moderation-clusterip-srv:4003/events', event).catch((e) => console.error(e));
  
  res.send({ status: 'OK'});
});

app.get('/events', (req, res) => {
  res.send(events);
})

app.listen(3333, () => {
  console.log('Listening on 3333');
});