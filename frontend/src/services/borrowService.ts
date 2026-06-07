import api from "../api/axios";

export const borrowBook = async (memberId: number, bookId: number) => {
  const response = await api.post("/borrow", {
    member_id: memberId,
    book_id: bookId,
  });

  return response.data;
};

export const returnBook = async (transactionId: number) => {
  const response = await api.post("/borrow/return", {
    transaction_id: transactionId,
  });

  return response.data;
};

export const getTransaction = async (transactionId: number) => {
  const response = await api.get(`/borrow/${transactionId}`);

  return response.data;
};

export const getMemberBorrowHistory = async (memberId: number) => {
  const response = await api.get(`/borrow/member/${memberId}`);

  return response.data;
};
