import { useEffect, useState } from "react";
import { Table, Button, Form, Modal, Pagination } from "react-bootstrap";

export default function ContentManager() {
  const [posts, setPosts] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Filters
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = async () => {
    let url = `http://localhost:5050/posts?page=${page}&limit=${limit}`;
    if (startDate) url += `&startDate=${startDate}`;
    if (endDate) url += `&endDate=${endDate}`;

    const res = await fetch(url);
    const data = await res.json();

    setPosts(data.data || []);
    setTotalPages(data.pagination?.totalPages || 1);
  };

  useEffect(() => {
    fetchPosts();
  }, [page, limit]);

  const handleDelete = async () => {
    await fetch(`http://localhost:5050/post/${deleteId}`, {
      method: "DELETE",
    });
    setShowDelete(false);
    fetchPosts(); // refresh list
  };

  const handleSearch = () => {
    setPage(1);
    fetchPosts();
  };

  return (
    <div className="p-4">
      <h2>Content Manager</h2>

      {/* Date Filters */}
      <div className="d-flex gap-3 mb-3">
        <Form.Control
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Form.Control
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
        <Button
          variant="secondary"
          onClick={() => {
            setStartDate("");
            setEndDate("");
            setPage(1);
            fetchPosts();
          }}
        >
          Reset
        </Button>
      </div>

      {/* Results per page */}
      <div className="mb-3">
        <Form.Select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          style={{ width: "150px" }}
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </Form.Select>
      </div>

      {/* Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Post ID</th>
            <th>Content</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center">
                No posts found
              </td>
            </tr>
          ) : (
            posts.map((post) => (
              <tr key={post._id}>
                <td>{post._id}</td>
                <td>{post.content}</td>
                <td>{new Date(post.createdAt).toLocaleString()}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setDeleteId(post._id);
                      setShowDelete(true);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      <Pagination>
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === page}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* Delete Confirmation Modal */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
