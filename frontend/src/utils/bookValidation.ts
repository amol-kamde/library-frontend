export const validateBook = (
  book: any
): string | null => {

  if (!book.title.trim()) {
    return "Title is required";
  }

  if (!book.author.trim()) {
    return "Author is required";
  }

  if (!book.isbn.trim()) {
    return "ISBN is required";
  }

  if (book.total_copies <= 0) {
    return "Total Copies must be greater than 0";
  }

  return null;
};