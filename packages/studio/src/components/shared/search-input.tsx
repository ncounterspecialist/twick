import { Search } from "lucide-react";

const SearchInput = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search media..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="input search-input w-full"
      />
      <Search className="search-icon" />
    </div>
  );
};

export default SearchInput;
