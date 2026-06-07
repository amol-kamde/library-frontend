import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById, updateBook } from "../../services/bookService";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormCard from "../../components/common/FormCard";
import { validateBook } from "../../utils/bookValidation";

function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    total_copies: 1,
  });

  useEffect(() => {
    loadBook();
  }, []);

  const loadBook = async () => {
    try {
      const response = await getBookById(Number(id));

      const bookData = response.data || response;

      setBook({
        title: bookData.title,
        author: bookData.author,
        isbn: bookData.isbn,
        total_copies: bookData.total_copies,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validationError = validateBook(book);

      if (validationError) {
        toast.error(validationError);
        return;
      }
      const response = await updateBook(Number(id), book);

      toast.success(response.message);

      navigate("/books");
    } catch (error:any) {
      console.error(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <FormCard title="Edit Book">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>

          <input
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
          Update Book
        </button>
      </form>
    </FormCard>
  );
}

export default EditBookPage;
