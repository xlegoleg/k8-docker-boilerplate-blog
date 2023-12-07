const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const posts = {};

const handleEvent = (type, data) => {
  switch (type) {
    case 'PostCreated': {
      const { id, title } = data;
      posts[id] = { id, title, comments: [] };
      break;
    }
    case 'CommentCreated': {
      const { id, content, postId, status } = data;
      
      const post = posts[postId];
      post.comments.push({ id, content, status });
      break;
    }
    
    case 'CommentUpdated': {
      const { id, content, postId, status } = data;
      
      const post = posts[postId];
      const comment = post.comments.find((v) => v.id === id);
      if (comment) {
        comment.status = status;
        comment.content = content;
      }
      break;
    }
  }
}

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  
  handleEvent(type, data);
  
  res.send({});
});

app.listen(4002, async () => {
  console.log('Listening on 4002');
  try {
    const res = await axios.get("http://event-bus-srv:3333/events");
    
    for (let event of res.data) {
      console.log("Processing event:", event.type);
      
      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
})