import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function FormsSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch search results from the backend
  const fetchResults = async (searchText) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/forms/search?q=${encodeURIComponent(searchText)}`);

      if (!response.ok) {
        throw new Error("Failed to fetch search results.");
      }

      const data = await response.json();
      console.log("Received response: ", data);
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search handler
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query.trim().length >= 3) {
        fetchResults(query);
      } else {
        setResults([]);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div className="flex flex-col w-1/3 items-center">
      {/* Search input */}
      <div className="border-2 border-gray-400 dark:border-gray-300 bg-background dark:bg-background-dark text-text dark:text-text-dark p-2 w-full flex flex-row items-center gap-3 px-4 rounded-full h-10">
        <FontAwesomeIcon className="text-gray-600" icon={faMagnifyingGlass} />
        <input
          type="text"
          placeholder="Search"
          className="border-none outline-none w-full bg-transparent"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Search results */}
      {/* <ul className="mt-4 hidden">
        {isLoading && <li>Loading...</li>}
        {error && <li className="text-red-500">{error}</li>}
        {!isLoading && results.length === 0 && query.trim().length >= 3 && (
          <li>No results found.</li>
        )}
        {results.map((form) => (
          <li key={form.link} className="mb-4">
            <a href={form.link} className="block p-4 bg-white shadow rounded-lg hover:bg-gray-100">
              <h3 className="text-lg font-semibold">{form.title}</h3>
              <p className="text-sm text-gray-600">{form.description}</p>
              <small className="text-xs text-gray-500">Topic: {form.topic}</small>
            </a>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
