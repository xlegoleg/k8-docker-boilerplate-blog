import { PostCreate } from "./components/PostCreate";
import { PostList } from "./components/PostList";

export const App = () => {
  return (
    <div className="container">
      <div>
        <h1>Create post</h1>
        <PostCreate></PostCreate>
      </div>
      <div>
        <h1>Posts</h1>
        <PostList></PostList>
      </div>
    </div>
  );
}

export default App;
