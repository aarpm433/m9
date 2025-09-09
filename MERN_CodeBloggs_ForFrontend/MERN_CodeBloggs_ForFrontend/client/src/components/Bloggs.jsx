import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";

export default function Bloggs() {
  const [cookies] = useCookies(["user"]);
  const [posts, setPosts] = useState([]);
  const [userStats, setUserStats] = useState({ totalPosts: 0, lastPostDate: null, status: "" });
  const [comments, setComments] = useState([]);

  // Get user initials
let initials = "Inistial";
let userName = "UserName";
let userStatus = "Status";
if (cookies.user) {
  try {
    const userObj = typeof cookies.user === "string" ? JSON.parse(cookies.user) : cookies.user;
    const user_id = userObj && userObj._id ? userObj._id : undefined;
    const firstInitial = userObj.first_name?.[0]?.toUpperCase() || "";
    const lastInitial = userObj.last_name?.[0]?.toUpperCase() || "";
    initials = (firstInitial + lastInitial) || "U";
    userName = `${userObj.first_name || ""} ${userObj.last_name || ""}`.trim();
    userStatus = userObj.status || "active";
  } catch {}
}

  // Fetch posts (with comments)
useEffect(() => {
  async function fetchData() {
    const postsRes = await fetch("http://localhost:5050/posts");
    const postsData = await postsRes.json();
    const userRes = await fetch("http://localhost:5050/users");
    const userData = await userRes.json();

    const postsWithUser = postsData.data.map(post => {
      const postUser = userData.data.find(user => user._id === post.user_id);
      return { ...post, user: postUser || null };
    });

    setPosts(postsWithUser);

    if (postsData.data?.length) {
      setUserStats({
        totalPosts: postsData.data.length,
        lastPostDate: postsData.data[0].createdAt,
        status: userStatus,
      });
    }
    // Fetch comments
    const commentsRes = await fetch("http://localhost:5050/comments");
    const commentsData = await commentsRes.json();
    setComments(commentsData.data || []);
  }
  fetchData();
}, []);


const handleLike = async (postId, currentLikes) => {
  const res = await fetch(`http://localhost:5050/post/${postId}`, {
    method: "PATCH", // <-- Use PATCH instead of PUT
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes: currentLikes + 1 }),
  });
  if (res.ok) {
    // Refetch posts to get updated likes
    const postsRes = await fetch("http://localhost:5050/posts");
    const postsData = await postsRes.json();
    setPosts(postsData.data || []);
  }
};
const getInitials = (user) => {
  if (!user) return "NA";
  const first = user.first_name?.[0]?.toUpperCase() || "N";
  const last = user.last_name?.[0]?.toUpperCase() || "A";
  return first + last;
};

  return (
    <div className="max-w-2xl mx-auto mt-8">
      {/* Posts */}
      <div>
        <h2 className="text-xl font-bold mb-4">Posts</h2>
        {posts.map(post => (
          <div key={post._id} className="border rounded p-4 mb-4">
            <div className="mb-2">{post.content}</div>
                <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">
                        {getInitials(post.user)}
                    </div>
                    <div className="font-semibold">
                        {post.user?.first_name} {post.user?.last_name}
                    </div>
                </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{new Date(post.createdAt).toLocaleString()}</span>
              <span className="flex items-center space-x-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleLike(post._id, post.likes || 0)}
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
                .filter(comment => comment.post_id === post._id)
                .map(comment => (
                  <div key={comment._id} className="ml-2 text-sm text-gray-700 border-l pl-2 mb-1">
                    {comment.content} <span className="text-gray-400">({new Date(comment.createdAt).toLocaleString()})</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}