import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import FormCard from "../../components/common/FormCard";

import { borrowBook } from "../../services/borrowService";
import { getBooksPaginated } from "../../services/bookService";
import { getMembers } from "../../services/memberService";

function BorrowBookPage() {
  const [memberId, setMemberId] = useState("");
  const [bookId, setBookId] = useState("");

  const [members, setMembers] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMembers();
    loadBooks();
  }, []);

  const loadMembers = async () => {
    try {
      const response = await getMembers(1, 100, "first_name", "asc");

      setMembers(response.data.data || []);
    } catch (error:any) {
      console.error(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const loadBooks = async () => {
    try {
      const response = await getBooksPaginated(1, 100);

      setBooks(response.data.data || []);
    } catch (error:any) {
      console.error(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!memberId) {
      toast.error("Please select a member");
      return;
    }

    if (!bookId) {
      toast.error("Please select a book");
      return;
    }

    try {
      setLoading(true);

      const response = await borrowBook(Number(memberId), Number(bookId));

      toast.success(response.data.message);

      setMemberId("");
      setBookId("");
    } catch (error) {
      console.error(error);

      toast.error("Borrow operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormCard title="Borrow Book">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Member</label>

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

          <div className="col-md-6 mb-3">
            <label className="form-label">Book</label>

            <select
              className="form-select"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
            >
              <option value="">Select Book</option>

              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-end">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Borrowing..." : "Borrow Book"}
          </button>
        </div>
      </form>
    </FormCard>
  );
}

export default BorrowBookPage;
