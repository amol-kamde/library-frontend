import { useEffect, useState } from "react";
import BookTable from "../../components/books/BookTable";
import type { Book } from "../../models/Book";
// import { getBooks } from "../../services/bookService";
import { Link } from "react-router-dom";
import {
  searchBooks,
  deleteBook,
  getBooksSorted,
} from "../../services/bookService";

import PageHeader from "../../components/common/PageHeader";

import Pagination from "../../components/common/Pagination";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchToolbar from "../../components/common/SearchToolbar";

function BookListPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  const [sortBy, setSortBy] = useState("title");

  const [direction, setDirection] = useState("asc");

  useEffect(() => {
    loadBooks();
  }, [page, size, sortBy, direction]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim().length === 0) {
        loadBooks();
        return;
      }

      if (searchTerm.trim().length >= 2) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const loadBooks = async () => {
    try {
      const response = await getBooksSorted(page, size, sortBy, direction);

      setBooks(response.data.data);

      setTotalRecords(response.data.total_records);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Are you sure?");

    if (!confirmed) {
      return;
    }

    try {
      const response = await deleteBook(id);

      toast.success(response.message);

      loadBooks();
    } catch (error:any) {
      console.error(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleSearch = async () => {
    try {
      if (!searchTerm.trim()) {
        loadBooks();

        return;
      }

      const response = await searchBooks(searchTerm);

      setBooks(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalPages = Math.ceil(totalRecords / size);

  return (
    <div>
      <PageHeader
        title="Books Management"
        buttonText="+ Add Book"
        buttonLink="/books/add"
      />

      <SearchToolbar
        searchPlaceholder="Enter title"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        direction={direction}
        setDirection={setDirection}
        size={size}
        setSize={setSize}
        sortOptions={[
          {
            label: "Title",
            value: "title",
          },
          {
            label: "Author",
            value: "author",
          },
          {
            label: "ISBN",
            value: "isbn",
          },
        ]}
      />

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <BookTable
            books={books}
            page={page}
            size={size}
            onDelete={handleDelete}
          />
        </div>
      </div>
      <Pagination
        page={page}
        size={size}
        totalRecords={totalRecords}
        onPageChange={setPage}
      />
    </div>
  );
}

export default BookListPage;
