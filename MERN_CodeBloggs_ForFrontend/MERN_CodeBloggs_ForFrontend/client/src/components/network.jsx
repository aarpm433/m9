import { useEffect, useState } from "react";

export default function Network() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Fetch users
      const usersRes = await fetch("http://localhost:5050/users");
      const usersData = await usersRes.json();

      // Fetch posts
      const postsRes = await fetch("http://localhost:5050/posts");
      const postsData = await postsRes.json();

      setUsers(usersData.data || []);
      setPosts(postsData.data || []);
    }
    fetchData();
  }, []);

  const getInitials = (user) => {
    if (!user) return "NA";
    const first = user.first_name?.[0]?.toUpperCase() || "";
    const last = user.last_name?.[0]?.toUpperCase() || "";
    return (first + last) || "NA";
  };

  const getLastPost = (userId) => {
    const userPosts = posts.filter(p => p.user_id === userId);
    if (userPosts.length === 0) return null;
    // Sort by date and take latest
    const lastPost = userPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    return lastPost;
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {users.map(user => {
        const lastPost = getLastPost(user._id);
        return (
          <div key={user._id} className="border rounded-lg shadow-md p-4">
            {/* User Header */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                {getInitials(user)}
              </div>
              <div>
                <div className="font-semibold">{user.first_name} {user.last_name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
                <div className="text-xs text-gray-400">Status: {user.status}</div>
              </div>
            </div>

            {/* Last Post */}
            {lastPost ? (
              <div className="text-sm text-gray-700 border-t pt-2">
                <span className="font-semibold">Last Post:</span>
                <p className="mt-1">{lastPost.content}</p>
                <span className="text-xs text-gray-400">
                  {new Date(lastPost.createdAt).toLocaleString()}
                </span>
              </div>
            ) : (
              <div className="text-sm text-gray-400 border-t pt-2">No posts yet</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
