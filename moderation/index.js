const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  
  switch (type) {
    case 'CommentCreated': {
      const status = data.content?.includes('orange') ? 'rejected': 'approved';
      
      axios.post('http://event-bus-srv:3333/events', {
        type: 'CommentModerated',
        data: {
          ...data,
          status
        }
      })
    }
  }
});

app.listen(4003, () => {
  console.log('Listening on 4003');
});