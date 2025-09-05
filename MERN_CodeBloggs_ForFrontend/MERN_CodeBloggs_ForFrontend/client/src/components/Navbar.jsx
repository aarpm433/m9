import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Modal, Button, Toast } from "react-bootstrap";
import { useCookies } from "react-cookie";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["session_token", "user"]);
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  // Parse user name from cookie
  let userName = "User";
  if (cookies.user) {
    try {
      const userObj = typeof cookies.user === "string" ? JSON.parse(cookies.user) : cookies.user;
      userName = userObj.first_name ? userObj.first_name : "User";
    } catch {
      userName = "User";
    }
  }

  const handleLogout = async () => {
    setOpen(false);
    try {
      await fetch("http://localhost:5050/session/logout", { method: "POST" });
    } catch (e) {}
    removeCookie("session_token", { path: "/" });
    removeCookie("user", { path: "/" });
    navigate("/login");
  };

  return (
    <>
      <header className="flex items-center justify-between py-3 px-8 shadow bg-white w-full flex-nowrap">
        {/* Left: Logo and Title */}
        <div className="">
          <NavLink to="/">
            <img
              alt="CodeBloggs_logo"
              src="/CBG.png"
              style={{ height: "80px", width: "80px", objectFit: "contain" }}
            />
          </NavLink>
          <h4 className="">CodeBloggs</h4>
        </div>

        {/* Right: Actions */}
        <div className="">
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Post
          </button>
          <div className="relative">
            <button onClick={() => setOpen(!open)} className="btn btn-secondary">
              {userName} ▾
            </button>
            {open && (
              <div className="">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowToast(true);
                    setOpen(false);
                    setTimeout(() => navigate("/settings"), 1000);
                  }}
                >
                  Account Settings
                </button>
                <button className="btn btn-secondary" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Modal for Post */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Post form or content here.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Save Post
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast outside header, fixed position */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          minWidth: '250px',
          zIndex: 9999,
        }}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{userName}'s Account</strong>
        </Toast.Header>
        <Toast.Body>Going to settings!</Toast.Body>
      </Toast>
    </>
  );
}