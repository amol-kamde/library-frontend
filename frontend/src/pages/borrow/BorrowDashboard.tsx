import { Link } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";

function BorrowDashboard() {
  console.log(
    "Borrow Dashboard Loaded"
  );
  return (
    <div>
      <PageHeader title="Borrow Management" />

      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5>Borrow Book</h5>

              <p className="text-muted">Issue books to members</p>

              <Link to="/borrow/book" className="btn btn-primary">
                Open
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5>Return Book</h5>

              <p className="text-muted">Return borrowed books</p>

              <Link to="/borrow/return" className="btn btn-primary">
                Open
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5>Borrow History</h5>

              <p className="text-muted">View borrowing history</p>

              <Link to="/borrow/history" className="btn btn-primary">
                Open
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BorrowDashboard;
