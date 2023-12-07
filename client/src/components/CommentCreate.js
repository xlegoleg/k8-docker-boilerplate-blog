import { useState } from "react";
import axios from "axios";

export const  CommentCreate = ({ postId, onUpdate }) => {
  const [content, setContent] = useState('')
  
  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.length) return;
    
    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content,
    })
    
    setContent('');
    
    onUpdate();
  }
  
  return(
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            onInput={(e) => setContent(e.target.value)}
            value={content}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}