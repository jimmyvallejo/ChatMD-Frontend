const SearchBar = ({query, setQuery}) => {
    return (
      
        <div className="w-full">
          <input
            id="input-with-image"
            type="text"
            className="border-slate-400 border-2 rounded-md w-full"
            placeholder="Search Conversation..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      
    );
}

export default SearchBar