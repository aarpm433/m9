import { useEffect, useState } from "react";
import { Table, Button, Form, Pagination, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchFirst, setSearchFirst] = useState("");
  const [searchLast, setSearchLast] = useState("");
  const [sortField, setSortField] = useState("first_name");
  const [page, setPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);


  // Modals
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const navigate = useNavigate();

  // Fetch all users (replace with API call)
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("http://localhost:5050/users");
        const data = await res.json();

        const usersArray = Array.isArray(data.data) ? data.data : [];
        setUsers(usersArray);
        setFilteredUsers(usersArray);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setUsers([]);
        setFilteredUsers([]);
      }
    }
    fetchUsers();
  }, []);

  // Search + sort
useEffect(() => {
  let filtered = users.filter(
    (u) =>
      u.first_name.toLowerCase().includes(searchFirst.toLowerCase()) &&
      u.last_name.toLowerCase().includes(searchLast.toLowerCase())
  );

  filtered.sort((a, b) => a[sortField].localeCompare(b[sortField]));
  setFilteredUsers(filtered);
  setPage(1);
}, [searchFirst, searchLast, users, sortField]);


  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const displayedUsers = filteredUsers.slice(
    (page - 1) * usersPerPage,
    page * usersPerPage
  );

  // Delete user
  const handleDelete = async () => {
    if (!selectedUser) return;
    await fetch(`http://localhost:5050/user/${selectedUser._id}`, {
      method: "DELETE",
    });
    setUsers(users.filter((u) => u._id !== selectedUser._id));
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  // Confirm edit
  const handleEdit = () => {
    if (!selectedUser) return;
    navigate(`/users/${selectedUser._id}`);
    setShowEditModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-4">
      <h2>User Manager</h2>

      {/* Search + Sort */}
      <div className="d-flex mb-3">
        <Form.Control
          type="text"
          placeholder="Search by first name..."
          value={searchFirst}
          onChange={(e) => setSearchFirst(e.target.value)}
          className="me-2"
        />
        <Form.Control
          type="text"
          placeholder="Search by last name..."
          value={searchLast}
          onChange={(e) => setSearchLast(e.target.value)}
          className="me-2"
        />
        <Button variant="secondary" className="me-2" onClick={() => {
          setSearchFirst("");
          setSearchLast("");
        }}>
          Clear
        </Button>
        <Form.Select
        value={usersPerPage}
        onChange={(e) => setUsersPerPage(Number(e.target.value))}
        style={{ width: "150px" }}
        className="me-2"
        >
        {[1,2,3,4,5,6,7,8,9,10].map(n => (
            <option key={n} value={n}>{n}</option>
        ))}
        </Form.Select>
        <Form.Select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          style={{ width: "200px" }}
        >
          <option value="first_name">Sort by First Name</option>
          <option value="last_name">Sort by Last Name</option>
        </Form.Select>
      </div>

      {/* User Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map((user) => (
            <tr key={user._id}>
              <td
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/users/${user._id}`)}
              >
                {user.first_name}
              </td>
              <td>{user.last_name}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setSelectedUser(user);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    setSelectedUser(user);
                    setShowDeleteModal(true);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <Pagination>
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item
            key={i}
            active={i + 1 === page}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>
            {selectedUser?.first_name} {selectedUser?.last_name}
          </strong>
          ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to edit{" "}
          <strong>
            {selectedUser?.first_name} {selectedUser?.last_name}
          </strong>
          ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
