import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";

export default function Home() {
  const [cookies] = useCookies(["user"]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [userStats, setUserStats] = useState({ totalPosts: 0, lastPostDate: null, status: "" });

  // Get user initials
  let initials = "U";
  if (cookies.user) {
    try {
      const userObj = typeof cookies.user === "string" ? JSON.parse(cookies.user) : cookies.user;
      initials = (userObj.first_name?.[0] || "") + (userObj.last_name?.[0] || "");
      userStats.status = userObj.status || "";
    } catch {}
  }

  // Fetch posts and comments
  useEffect(() => {
    async function fetchData() {
      const postsRes = await fetch("http://localhost:5050/posts");
      const postsData = await postsRes.json();
      setPosts(postsData.data || []);
      if (postsData.data?.length) {
        setUserStats({
          ...userStats,
          totalPosts: postsData.data.length,
          lastPostDate: postsData.data[0].createdAt,
        });
      }
      const commentsRes = await fetch("http://localhost:5050/comments");
      const commentsData = await commentsRes.json();
      setComments(commentsData.data || []);
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  // Like handler
  const handleLike = async (postId) => {
    await fetch(`http://localhost:5050/posts/${postId}/like`, { method: "POST" });
    setPosts(posts =>
      posts.map(post =>
        post._id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
      )
    );
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      {/* User Info */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
          {initials}
        </div>
        <div>
          <div className="font-bold text-lg">{cookies.user?.first_name} {cookies.user?.last_name}</div>
          <div className="text-gray-600">{userStats.status}</div>
          <div className="text-sm text-gray-500">
            Posts: {userStats.totalPosts} | Last post: {userStats.lastPostDate ? new Date(userStats.lastPostDate).toLocaleDateString() : "N/A"}
          </div>
        </div>
      </div>

      {/* Posts */}
      <div>
        <h2 className="text-xl font-bold mb-4">Posts</h2>
        {posts.map(post => (
          <div key={post._id} className="border rounded p-4 mb-4">
            <div className="mb-2">{post.message}</div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{new Date(post.createdAt).toLocaleString()}</span>
              <span className="flex items-center space-x-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleLike(post._id)}
                >
                  <FaThumbsUp />
                </button>
                <span>{post.likes || 0}</span>
              </span>
            </div>
            {/* Comments for this post */}
            <div className="mt-3">
              <div className="font-semibold text-sm mb-1">Comments:</div>
              {comments
                .filter(comment => comment.postId === post._id)
                .map(comment => (
                  <div key={comment._id} className="ml-2 text-sm text-gray-700 border-l pl-2 mb-1">
                    {comment.message} <span className="text-gray-400">({new Date(comment.createdAt).toLocaleString()})</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}