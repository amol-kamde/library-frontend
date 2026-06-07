import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBook } from "../../services/bookService";
import { toast } from "react-toastify";
import FormCard from "../../components/common/FormCard";
import { validateBook } from "../../utils/bookValidation";

function AddBookPage() {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    total_copies: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validationError = validateBook(book);

      if (validationError) {
        toast.error(validationError);
        return;
      }
      const response =await createBook(book);

      toast.success(response.message);

      navigate("/books");
    } catch (error:any) {
      console.error(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <FormCard title="Add Book">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>

          <input
            type="text"
            className="form-control"
            value={book.title}
            onChange={(e) =>
              setBook({
                ...book,
                title: e.target.value,
              })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Author</label>

          <input
            type="text"
            className="form-control"
            value={book.author}
            onChange={(e) =>
              setBook({
                ...book,
                author: e.target.value,
              })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">ISBN</label>

          <input
            type="text"
            className="form-control"
            value={book.isbn}
            onChange={(e) =>
              setBook({
                ...book,
                isbn: e.target.value,
              })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Total Copies</label>

          <input
            type="number"
            className="form-control"
            value={book.total_copies}
            onChange={(e) =>
              setBook({
                ...book,
                total_copies: Number(e.target.value),
              })
            }
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Save Book
        </button>
      </form>
    </FormCard>
  );
}

export default AddBookPage;
