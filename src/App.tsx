import "./App.css";
import api from "@apis";
import { useState } from "react";

interface User {
  id: number;
  name: string;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<{ id: number; title: string }[]>([]);

  const handleFetch = () => {
    api.get("/api/users").then((res) => {
      setUsers(res.data);
    });
    api.get("/api/posts").then((res) => {
      setPosts(res.data);
    });
    api.get("api/users/1").then((res) => {
      setUser(res.data);
    });
  };

  return (
    <main
      style={{
        backgroundColor: "white",
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <button onClick={handleFetch}>fetch</button>
        <h1 style={{ color: "black" }}>userName: {user?.name}</h1>
        <ul style={{ color: "black" }}>
          {users.map((user) => (
            <li key={user.id}>name: {user.name}</li>
          ))}
        </ul>

        <ul style={{ color: "black" }}>
          {posts.map((post) => (
            <li key={post.id}>post: {post.title}</li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default App;
