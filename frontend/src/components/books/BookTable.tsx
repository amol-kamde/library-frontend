import type { Book } from "../../models/Book";
import { Link } from "react-router-dom";

interface Props {
  books: Book[];
  page: number;
  size: number;
  onDelete: (id: number) => void;
}

function BookTable({ books, page, size, onDelete }: Props) {
  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Sr No</th>
          <th>Title</th>
          <th>Author</th>
          <th>ISBN</th>
          <th>Total Copies</th>
          <th>Available Copies</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {books.map((book, index) => (
          <tr key={book.id}>
            <td>{((page - 1) * size) + index + 1}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.isbn}</td>
            <td>{book.total_copies}</td>
            <td>{book.available_copies}</td>

            <td>
              <Link
                to={`/books/edit/${book.id}`}
                className="btn btn-warning btn-sm me-2"
              >
                Edit
              </Link>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(book.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BookTable;
