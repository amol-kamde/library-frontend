import api from "../api/axios";
import type { Book } from "../models/Book";

export const getBooks = async () => {
  const response = await api.get("/books");
  return response.data;
};

export const createBook = async (book: {
  title: string;
  author: string;
  isbn: string;
  total_copies: number;
}) => {
  const response = await api.post("/books", book);
  return response.data;
};

export const deleteBook = async (id: number) => {
  const response = await api.delete(`/books/${id}`);

  return response.data;
};

export const getBookById = async (id: number) => {
  const response = await api.get(`/books/${id}`);

  return response.data;
};

export const updateBook = async (
  id: number,
  book: {
    title: string;
    author: string;
    isbn: string;
    total_copies: number;
  },
) => {
  const response = await api.put(`/books/${id}`, book);

  return response.data;
};

export const searchBooks = async (keyword: string) => {
  const response = await api.get(`/books?search=${keyword}`);

  return response.data;
};

export const getBooksPaginated = async (page: number, size: number) => {
  const response = await api.get(`/books?page=${page}&size=${size}`);

  return response.data;
};

export const getBooksSorted = async (
  page: number,
  size: number,
  sortBy: string,
  direction: string,
) => {
  const response = await api.get(
    `/books?page=${page}&size=${size}&sort_by=${sortBy}&direction=${direction}`,
  );

  return response.data;
};
