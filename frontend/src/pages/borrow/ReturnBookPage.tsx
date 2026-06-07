import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import FormCard from "../../components/common/FormCard";

import {
  getMemberBorrowHistory,
  returnBook,
} from "../../services/borrowService";

import { getMembers } from "../../services/memberService";

function ReturnBookPage() {
  const [memberId, setMemberId] = useState("");

  const [transactionId, setTransactionId] = useState("");

  const [members, setMembers] = useState<any[]>([]);

  const [transactions, setTransactions] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const response = await getMembers(1, 100, "first_name", "asc");

      console.log("Members Response", response);

      // Adjust if your response structure differs
      setMembers(response.data.data || []);
    } catch (error:any) {
      console.error(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleMemberChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedId = e.target.value;

    setMemberId(selectedId);

    setTransactionId("");

    if (!selectedId) {
      setTransactions([]);

      return;
    }

    try {
      const response = await getMemberBorrowHistory(Number(selectedId));

      console.log("Transactions Response", response);

      setTransactions(response.data || []);
    } catch (error:any) {
      console.error(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!transactionId) {
      toast.error("Please select a transaction");

      return;
    }

    try {
      setLoading(true);

      const response = await returnBook(Number(transactionId));

      toast.success(response.data.message);

      setTransactionId("");
    } catch (error:any) {
      console.error(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormCard title="Return Book">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Member</label>

            <select
              className="form-select"
              value={memberId}
              onChange={handleMemberChange}
            >
              <option value="">Select Member</option>

              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.first_name} {member.last_name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Transaction</label>

            <select
              className="form-select"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            >
              <option value="">Select Transaction</option>

              {transactions.map((transaction) => (
                <option key={transaction.id} value={transaction.id}>
                  Transaction #{transaction.id}
                  {" | Book "}
                  {transaction.book_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-end">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Returning..." : "Return Book"}
          </button>
        </div>
      </form>
    </FormCard>
  );
}

export default ReturnBookPage;
