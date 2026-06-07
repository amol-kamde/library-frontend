import { Routes, Route } from "react-router-dom";

import DashboardPage from "../pages/dashboard/Dashboard";
import BookListPage from "../pages/books/BookListPage";
import MemberListPage from "../pages/members/MemberListPage";
import BorrowPage from "../pages/borrow/BorrowBookPage";
import AddBookPage from "../pages/books/AddBookPage";
import EditBookPage from "../pages/books/EditBookPage";
import AddMemberPage from "../pages/members/AddMemberPage";
import EditMemberPage from "../pages/members/EditMemberPage";
import BorrowDashboard from "../pages/borrow/BorrowDashboard";
import BorrowBookPage from "../pages/borrow/BorrowBookPage";
import ReturnBookPage from "../pages/borrow/ReturnBookPage";
import BorrowHistoryPage from "../pages/borrow/BorrowHistoryPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/books" element={<BookListPage />} />
      <Route path="/books/add" element={<AddBookPage />} />

      <Route path="/members" element={<MemberListPage />} />
      <Route path="/books/edit/:id" element={<EditBookPage />} />
      <Route path="/members/add" element={<AddMemberPage />} />
      <Route path="/members/edit/:id" element={<EditMemberPage />} />

      <Route path="/borrow" element={<BorrowDashboard />} />
      <Route path="/borrow/book" element={<BorrowBookPage />} />
      <Route path="/borrow/return" element={<ReturnBookPage />} />
      <Route path="/borrow/history" element={<BorrowHistoryPage />} />
    </Routes>
  );
}

export default AppRoutes;
