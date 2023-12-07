import axios from "axios";
import { useEffect, useState } from "react";
import { CommentCreate } from "./CommentCreate";
import { CommentList } from "./CommentList";

export const PostList = () => {
  const [posts, setPosts] = useState([])
  
  const fetchPosts = async () => {
    const res = await axios.get('http://posts.com/posts');
    
    
    setPosts(res.data);
  }
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
  const renderedPosts = () => {
    return (Object.values(posts) ?? posts ?? []).map((v) => {
      return (
        <div key={v.id} className="card" style={{ width: '30%', marginBottom: '20px'}}>
          <div className="card-body">
            <h3>{v.title}</h3>
            {v.comments?.length && <CommentList comments={v?.comments}/>}
            <CommentCreate onUpdate={fetchPosts.bind(this)} postId={v.id}/>
          </div>
        </div>
      )
    })
  }
  
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts()}
    </div>
  )
}