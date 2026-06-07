interface SearchToolbarProps {
  searchPlaceholder: string;
  searchTerm: string;
  setSearchTerm: (value: string) => void;

  sortBy: string;
  setSortBy: (value: string) => void;

  direction: string;
  setDirection: (value: string) => void;

  size: number;
  setSize: (value: number) => void;

  sortOptions: {
    label: string;
    value: string;
  }[];
}

function SearchToolbar({
  searchPlaceholder,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  direction,
  setDirection,
  size,
  setSize,
  sortOptions,
}: SearchToolbarProps) {
  return (
    <div className="row align-items-end mb-4">

      <div className="col-md-4">
        <label className="form-label">
          Search
        </label>

        <input
          type="text"
          className="form-control"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />
      </div>

      <div className="col-md-2">
        <label className="form-label">
          Sort By
        </label>

        <select
          className="form-select"
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-2">
        <label className="form-label">
          Direction
        </label>

        <select
          className="form-select"
          value={direction}
          onChange={(e) =>
            setDirection(
              e.target.value
            )
          }
        >
          <option value="asc">
            Ascending
          </option>

          <option value="desc">
            Descending
          </option>
        </select>
      </div>

      <div className="col-md-2">
        <label className="form-label">
          Records/Page
        </label>

        <select
          className="form-select"
          value={size}
          onChange={(e) =>
            setSize(
              Number(
                e.target.value
              )
            )
          }
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

    </div>
  );
}

export default SearchToolbar;