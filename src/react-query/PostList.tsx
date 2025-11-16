import { useState } from "react";
import usePosts from "./hooks/usePosts";

const PostList = () => {
  const [selectedUserId, setSelectedUserId] = useState<number>();
  const { posts, error, isLoading } = usePosts(selectedUserId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const handleUserSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = parseInt(e.target.value);
    console.log("Selected user ID:", userId);
    setSelectedUserId(userId);
  }

  return (
    <>
      <h3>Posts</h3>
      <select className="form-select mb-3" onChange={handleUserSelect} value={selectedUserId}>
        <option value={undefined}>All Users</option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostList;
