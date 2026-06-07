interface PaginationProps {
  page: number;
  size: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  page,
  size,
  totalRecords,
  onPageChange,
}: PaginationProps) {

  const totalPages = Math.ceil(
    totalRecords / size
  );

  return (
    <div className="d-flex justify-content-between align-items-center mt-3">

      <div className="text-muted small">
        Showing {((page - 1) * size) + 1}
        {" - "}
        {Math.min(page * size, totalRecords)}
        {" of "}
        {totalRecords}
        {" records"}
      </div>

      <div>

        <button
          className="btn btn-outline-secondary btn-sm me-2"
          disabled={page === 1}
          onClick={() =>
            onPageChange(page - 1)
          }
        >
          Previous
        </button>

        <span className="small">
          Page {page} of {totalPages || 1}
        </span>

        <button
          className="btn btn-outline-secondary btn-sm ms-2"
          disabled={page >= totalPages}
          onClick={() =>
            onPageChange(page + 1)
          }
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default Pagination;