import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">

        <Link className="navbar-brand" to="/">
          📚 Neighborhood Library Service - Management
        </Link>

        <div className="navbar-nav">

          <Link
            className="nav-link"
            to="/books"
          >
            Books
          </Link>

          <Link
            className="nav-link"
            to="/members"
          >
            Members
          </Link>

          <Link
            className="nav-link"
            to="/borrow"
          >
            Borrow
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;