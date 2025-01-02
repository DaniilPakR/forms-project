import { useState, useEffect, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { GlobalContext } from "../context/GlobalProvider";

export default function FormsSearch({ t }) {
  const { URL } = useContext(GlobalContext);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);

  const [debouncedSearchText, setDebouncedSearchText] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchText(searchText), 300);
    return () => clearTimeout(handler);
  }, [searchText]);

  useEffect(() => {
    if (!debouncedSearchText) {
      setResults([]);
      return;
    }

    setResults([]);

    async function search() {
      try {
        setIsLoading(true);
        const response = await fetch(`${URL}/forms/search?query=${searchText}`);

        if (!response.ok) {
          throw new Error("Failed to fetch search results.");
        }

        const data = await response.json();
        console.log("Received response: ", data);
        setResults(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    search();
  }, [debouncedSearchText, URL]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setResultsVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col w-1/3 items-center" ref={searchRef}>
      <div className="relative w-full">
        <div className="border-2 border-gray-400 dark:border-gray-300 bg-background dark:bg-background-dark text-text dark:text-text-dark p-2 w-full flex items-center gap-3 px-4 rounded-full h-10 shadow-sm transition-all duration-300 ease-in-out focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-500">
          <FontAwesomeIcon
            className="text-gray-600 dark:text-gray-300"
            icon={faMagnifyingGlass}
          />
          <input
            type="text"
            placeholder={t("header.search")}
            className="border-none outline-none w-full bg-transparent text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:ring-0"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setResultsVisible(true);
            }}
            onFocus={() => setResultsVisible(true)}
          />
        </div>

        {/* Results Dropdown */}
        {searchText.length > 0 && resultsVisible && (
          <div className="absolute top-full left-0 w-full mt-2 bg-background dark:bg-background-dark text-text dark:text-text-dark border border-gray-300 dark:border-gray-600 rounded-md max-h-60 overflow-y-auto shadow-lg z-10 transition-all duration-300 ease-in-out">
            {isLoading ? (
              <div className="p-2 text-gray-500 dark:text-gray-400">
                Loading...
              </div>
            ) : results.length > 0 ? (
              results.map((result) => (
                <Link
                  key={result.page_id}
                  className="block w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-md transition-all duration-300 ease-in-out"
                  to={`/fform/${result.page_id}`}
                  onClick={() => setResultsVisible(false)}
                >
                  {result.title}
                </Link>
              ))
            ) : (
              <div className="p-2 text-gray-500 dark:text-gray-400">
                No results found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
