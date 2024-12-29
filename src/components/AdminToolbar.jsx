import { useEffect, useState, useContext } from "react";

import { GlobalContext } from "../context/GlobalProvider";
import { formatDate } from "../utils/formateDate";

export default function AdminToolbar() {
  const { currentUser, t, URL } = useContext(GlobalContext);
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
        action === "delete"
          ? `${URL}/users/delete`
          : `${URL}/users/action`;

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
      <table className="hidden w-full table-auto border-collapse border border-gray-300 text-sm lg:table">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th className="border border-gray-300 p-2">
              {t("userManagement.name")}
            </th>
            <th className="border border-gray-300 p-2">
              {t("userManagement.email")}
            </th>
            <th className="border border-gray-300 p-2">
              {t("userManagement.admin")}
            </th>
            <th className="border border-gray-300 p-2">
              {t("userManagement.blocked")}
            </th>
            <th className="border border-gray-300 p-2 hidden lg:table-cell">
              {t("userManagement.updatedAt")}
            </th>
            <th className="border border-gray-300 p-2 hidden lg:table-cell">
              {t("userManagement.createdAt")}
            </th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr
                key={user.user_id}
                className="text-center hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="border border-gray-300 p-2">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.user_id)}
                    onChange={() => handleSelectUser(user.user_id)}
                  />
                </td>
                <td className="border border-gray-300 p-2">{user.user_name} {currentUser.email === user.user_email ? "(You)" : ""}</td>
                <td className="border border-gray-300 p-2">
                  {user.user_email}
                </td>
                <td className="border border-gray-300 p-2">
                  {user.is_admin
                    ? t("userManagement.yes")
                    : t("userManagement.no")}
                </td>
                <td className="border border-gray-300 p-2">
                  {user.is_blocked
                    ? t("userManagement.yes")
                    : t("userManagement.no")}
                </td>
                <td className="border border-gray-300 p-2 hidden lg:table-cell">
                  {formatDate(user.updated_at)}
                </td>
                <td className="border border-gray-300 p-2 hidden lg:table-cell">
                  {formatDate(user.created_at)}
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
