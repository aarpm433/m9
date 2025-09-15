import { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    birthday: "",
    status: "",
    location: "",
    occupation: "",
  });
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`http://localhost:5050/user/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch user");
        // Map backend fields into form state
        setUser({
          first_name: data.data.first_name || "",
          last_name: data.data.last_name || "",
          birthday: data.data.birthday ? new Date(data.data.birthday).toISOString().split("T")[0] : "",
          status: data.data.status || "",
          location: data.data.location || "",
          occupation: data.data.occupation || "",
        });
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    }
    fetchUser();
  }, [id]);

  const handleSave = async () => {
    if (password && password !== repeatPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");

    try {
      const res = await fetch(`http://localhost:5050/user/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...user,
          ...(password && { password }),
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to update user");

      navigate("/admin/users");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4">
      <h2>Edit User</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            value={user.first_name}
            onChange={(e) =>
              setUser({ ...user, first_name: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            value={user.last_name}
            onChange={(e) =>
              setUser({ ...user, last_name: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            value={user.birthday}
            onChange={(e) =>
              setUser({ ...user, birthday: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Control
            value={user.status}
            onChange={(e) =>
              setUser({ ...user, status: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            value={user.location}
            onChange={(e) =>
              setUser({ ...user, location: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Occupation</Form.Label>
          <Form.Control
            value={user.occupation}
            onChange={(e) =>
              setUser({ ...user, occupation: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Form>
    </div>
  );
}
