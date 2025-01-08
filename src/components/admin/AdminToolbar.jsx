import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { GlobalContext } from "../../context/GlobalProvider";
import { formatDate } from "../../utils/format-date/formateDate";

export default function AdminToolbar() {
  const navigate = useNavigate();
  const { currentUser, t, URL, setIsAdmin, setCurrentUser, isAdmin } =
    useContext(GlobalContext);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(`${URL}/users/get`);
        if (!response.ok) {
          throw new Error("Failed to get users");
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchUsers();
  }, [URL]);

  useEffect(() => {
    users.forEach((user) => {
      if (user.user_id === currentUser.id) {
        if (user.is_blocked) {
          setCurrentUser(null);
          localStorage.removeItem("authSession");
          localStorage.removeItem("isAdmin");
        }
        setIsAdmin(user.is_admin);
        if (!user.is_admin) {
          setIsAdmin(false);
          localStorage.setItem("isAdmin", false);
          navigate("/");
        }
      }
    });
    console.log("Check", users);
  }, [users]);

  useEffect(() => {
    setSelectAll(users.length > 0 && selectedUsers.length === users.length);
  }, [selectedUsers, users]);

  const handleSelectUser = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedUsers(!selectAll ? users.map((user) => user.user_id) : []);
  };

  const performAction = async (action) => {
    try {
      const method = action === "delete" ? "DELETE" : "POST";
      const endpoint =
        action === "delete" ? `${URL}/users/delete` : `${URL}/users/action`;

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userIds: selectedUsers, action }),
      });

      if (!response.ok) {
        throw new Error("Action failed");
      }

      setSelectedUsers([]);
      setSelectAll(false);

      const refreshedUsers = await fetch(`${URL}/users/get`);
      const refreshedData = await refreshedUsers.json();
      setUsers(refreshedData.users);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 lg:text-3xl">
        {t("userManagement.title")}
      </h1>
      <div className="mb-4 flex flex-col gap-2 lg:flex-row">
        <button
          onClick={() => performAction("delete")}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 lg:px-6 lg:py-3"
        >
          {t("userManagement.delete")}
        </button>
        <button
          onClick={() => performAction("block")}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 lg:px-6 lg:py-3"
        >
          {t("userManagement.block")}
        </button>
        <button
          onClick={() => performAction("unblock")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 lg:px-6 lg:py-3"
        >
          {t("userManagement.unblock")}
        </button>
        <button
          onClick={() => performAction("make_admin")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 lg:px-6 lg:py-3"
        >
          {t("userManagement.makeAdmin")}
        </button>
        <button
          onClick={() => performAction("remove_admin")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 lg:px-6 lg:py-3"
        >
          {t("userManagement.removeAdmin")}
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200 rounded-lg shadow-lg">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              <label className="flex items-center justify-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="hidden peer"
                />
                <div className="w-5 h-5 rounded border-2 border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-500 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white hidden peer-checked:block"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.296a1 1 0 00-1.408 0L7.5 12.093 4.704 9.296a1 1 0 10-1.408 1.408l3.5 3.5a1 1 0 001.408 0l8-8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </label>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              {t("userManagement.name")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              {t("userManagement.email")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              {t("userManagement.admin")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              {t("userManagement.blocked")}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
          {users.map((user) => (
            <tr
              key={user.user_id}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <td className="px-6 py-4 text-center">
                <label className="flex items-center justify-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.user_id)}
                    onChange={() => handleSelectUser(user.user_id)}
                    className="hidden peer"
                  />
                  <div className="w-5 h-5 rounded border-2 border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-500 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white hidden peer-checked:block"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.296a1 1 0 00-1.408 0L7.5 12.093 4.704 9.296a1 1 0 10-1.408 1.408l3.5 3.5a1 1 0 001.408 0l8-8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </label>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {user.user_name}{" "}
                {currentUser.email === user.user_email ? "(You)" : ""}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {user.user_email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {user.is_admin
                  ? t("userManagement.yes")
                  : t("userManagement.no")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {user.is_blocked
                  ? t("userManagement.yes")
                  : t("userManagement.no")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="lg:hidden">
        {users &&
          users.map((user) => (
            <div
              key={user.user_id}
              className="mb-4 border border-gray-300 p-4 rounded shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="mb-2">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.user_id)}
                  onChange={() => handleSelectUser(user.user_id)}
                  className="mr-2"
                />
                <span className="font-bold">{user.user_name}</span>
              </div>
              <div>
                <span className="font-semibold">
                  {t("userManagement.email")}:{" "}
                </span>
                {user.user_email}
              </div>
              <div>
                <span className="font-semibold">
                  {t("userManagement.admin")}:{" "}
                </span>
                {user.is_admin
                  ? t("userManagement.yes")
                  : t("userManagement.no")}
              </div>
              <div>
                <span className="font-semibold">
                  {t("userManagement.blocked")}:{" "}
                </span>
                {user.is_blocked
                  ? t("userManagement.yes")
                  : t("userManagement.no")}
              </div>
              <div>
                <span className="font-semibold">
                  {t("userManagement.updatedAt")}:{" "}
                </span>
                {formatDate(user.updated_at)}
              </div>
              <div>
                <span className="font-semibold">
                  {t("userManagement.createdAt")}:{" "}
                </span>
                {formatDate(user.created_at)}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
