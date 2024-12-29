import { useState, useEffect, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { GlobalContext } from "../context/GlobalProvider";

export default function FormsSearch({t}) {
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

    setResults([])

    async function search() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${URL}/forms/search?query=${searchText}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch search results.");
        }

        const data = await response.json();
        console.log("Received response: ", data);
        setResults(data)
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    search();
  }, [debouncedSearchText]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setResultsVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col w-1/3 items-center" ref={searchRef}>
      <div className="border-2 border-gray-400 dark:border-gray-300 bg-background dark:bg-background-dark text-text dark:text-text-dark p-2 w-full flex flex-row items-center gap-3 px-4 rounded-full h-10">
        <FontAwesomeIcon className="text-gray-600" icon={faMagnifyingGlass} />
        <input
          type="text"
          placeholder={t("header.search")}
          className="border-none outline-none w-full bg-transparent"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setResultsVisible(true);
          }}
          onFocus={() => setResultsVisible(true)}
        />
      </div>
      <div className="relative w-full">
        {searchText.length > 0 && resultsVisible && (
          <div className="absolute top-full bg-background dark:bg-background-dark text-text dark:text-text-dark border-gray-300 rounded-md w-full max-h-60 overflow-y-auto shadow-md z-10">
            {isLoading ? (
              <div className="p-2 text-gray-500">Loading...</div>
            ) : results.length > 0 ? (
              results.map((result, index) => (
                <Link
                  key={result.page_id}
                  className="block w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  to={`/fform/${result.page_id}`}
                  onClick={() => setResultsVisible(false)}
                >
                  {result.title}
                </Link>
              ))
            ) : (
              <div className="p-2 text-gray-500">No results found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
