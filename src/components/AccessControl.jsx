import { useEffect, useState, useContext } from "react";

import { GlobalContext } from "../context/GlobalProvider";

export default function AccessControl({ users, setUsers }) {
  const { URL, t } = useContext(GlobalContext);
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (input.length < 3) {
        setResults([]);
        return;
      }
      setResults([]);
      try {
        const response = await fetch(`${URL}/users/search?query=${input}`);
        if (!response.ok) throw new Error("Failed to fetch search results.");
        const data = await response.json();
        setResults(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchUsers();
  }, [input, URL]);

  const handleUserSelect = (user) => {
    setInput("");
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const handleRemoveUser = (user) => {
    setUsers((prevUsers) =>
      prevUsers.filter((u) => u.user_id !== user.user_id)
    );
  };

  console.log(users);

  return (
    <div>
      <ul>
        {users.map((user, idx) => (
          <li
            key={user.user_email}
            className="flex flex-row justify-between items-center gap-4 rounded-lg p-2 shadow-md"
          >
            <div className="flex flex-row gap-4 items-center">
              <p>{idx + 1}.</p>
              <p>
                {user.user_name} | {user.user_email}
              </p>
            </div>
            <button
              onClick={() => handleRemoveUser(user)}
              className="justify-self-end bg-red-500 text-text-dark text-center py-1 px-2 rounded hover:bg-red-700"
            >
              {t("userList.removeButton")}
            </button>
          </li>
        ))}
      </ul>
      <span className="text-xs text-gray-500 hidden lg:inline">
        {t("userList.searchHint")}
      </span>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="mt-1 w-full rounded-lg p-2 bg-background dark:bg-background-dark border-gray-400 border text-text dark:text-text-dark"
      />
      <ul className="relative z-50 w-full">
        {results.map((user) => (
          <li
            key={user.id}
            onClick={() => handleUserSelect(user)}
            className="cursor-pointer absolute border rounded-lg p-2 bg-white dark:bg-background-dark shadow-md w-full"
          >
            {user.user_name} | {user.user_email}
          </li>
        ))}
      </ul>
    </div>
  );
}
