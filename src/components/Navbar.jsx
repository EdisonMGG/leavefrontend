import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Assuming you use React Router for navigation

const Navbar = () => {
  const navigate = useNavigate(); // To navigate to login after logout

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove authentication token from storage
    alert("Logged out successfully!");
    navigate('/HodSignIn'); // Redirect to login page (assuming '/login' is the login route)
};

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Leave Management App</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/searchleavestud">Search Student</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/searchleavefaculty">Search Faculty</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/viewStud">View Student</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/viewFaculty">View Faculty</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/approvedrejectedleaves">approvedrejectedleaves</Link>
              </li>
            </ul>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;