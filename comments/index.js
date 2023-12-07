const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');


const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.status(200).send(commentsByPostId[req.params.id] ?? []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { content } = req.body;
  
  const comments = commentsByPostId[req.params.id] ?? [];
  const comment = {
    id,
    content,
    status: 'pending'
  }
  comments.push(comment);
  commentsByPostId[req.params.id] = comments;
  
  await axios.post('http://event-bus-srv:3333/events', {
    type: 'CommentCreated',
    data: {
      ...comment,
      postId: req.params.id,
    },
  });
  
  res.status(201).send(comment);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  
  switch (type) {
    case 'CommentModerated': {
      const { id, postId, status } = data;
      const comments = commentsByPostId[postId];
      const comment = comments.find((v) => v.id === id);
      
      if (comment) {
        comment.status = status;
      }
      
      await axios.post('http://event-bus-srv:3333/events', {
        type: 'CommentUpdated',
        data: {
          ...comment,
          postId,
        }
      })
    }
  }
  
  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});