const SearchBar = ({query, setQuery}) => {
    return (
      <div className="w-full">
        <input
          id="input-with-image"
          type="text"
          className="border-gray-400 border-opacity-100 border rounded-md w-full bg-gray-200 bg-opacity-5 mt-2"
          placeholder="Search Conversation..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
    );
}

export default SearchBar