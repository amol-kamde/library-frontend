import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import PageHeader from "../../components/common/PageHeader";

import { getMemberBorrowHistory } from "../../services/borrowService";

import { getMembers } from "../../services/memberService";

function BorrowHistoryPage() {
  const [memberId, setMemberId] = useState("");

  const [members, setMembers] = useState<any[]>([]);

  const [transactions, setTransactions] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const loadHistory = async () => {
    if (!memberId) {
      toast.error("Please enter Member ID");

      return;
    }

    try {
      setLoading(true);

      const response = await getMemberBorrowHistory(Number(memberId));

      setTransactions(response.data || []);
    } catch (error:any) {
      console.error(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const response = await getMembers(1, 100, "first_name", "asc");

      setMembers(response.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <PageHeader title="Borrow History" />

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-md-4">
              <label className="form-label">Member ID</label>

              {/* <input
                type="number"
                className="form-control"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
              /> */}

              <select
                className="form-select"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
              >
                <option value="">Select Member</option>

                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.first_name} {member.last_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-2 d-flex align-items-end">
              <button
                className="btn btn-primary"
                onClick={loadHistory}
                disabled={loading}
              >
                Search
              </button>
            </div>
          </div>

          <table className="table table-hover">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Book ID</th>
                <th>Borrow Date</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Return Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    No records found
                  </td>
                </tr>
              ) : (
                transactions.map((transaction, index) => (
                  <tr key={transaction.id}>
                    <td>{index + 1}</td>

                    <td>{transaction.book_id}</td>

                    <td>{transaction.borrow_date}</td>

                    <td>{transaction.due_date}</td>

                    <td>
                      <span
                        className={
                          transaction.status === "BORROWED"
                            ? "badge bg-warning"
                            : "badge bg-success"
                        }
                      >
                        {transaction.status}
                      </span>
                    </td>

                    <td>{transaction.return_date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BorrowHistoryPage;
