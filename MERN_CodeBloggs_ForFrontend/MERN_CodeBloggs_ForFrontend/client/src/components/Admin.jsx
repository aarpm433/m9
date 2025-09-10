import { useCookies } from "react-cookie";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdminView() {
  const [cookies] = useCookies(["user"]);
  const navigate = useNavigate();

  useEffect(() => {
    // Parse cookie (in case it's a string)
    const userObj =
      typeof cookies.user === "string" ? JSON.parse(cookies.user) : cookies.user;

    if (!userObj || userObj.auth_level !== "admin") {
      navigate("/home");
    }
  }, [cookies, navigate]);

  return (
    <div className="max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* User Manager */}
      <Card className="shadow-md rounded-lg p-4">
        <Card.Body>
          <Card.Title>User Manager</Card.Title>
          <Card.Text>Manage users here.</Card.Text>
        </Card.Body>
      </Card>

      {/* Content Manager */}
      <Card className="shadow-md rounded-lg p-4">
        <Card.Body>
          <Card.Title>Content Manager</Card.Title>
          <Card.Text>Manage blog posts, comments, and media here.</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
