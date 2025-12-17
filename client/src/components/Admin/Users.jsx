import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  ImageIcon,
} from "lucide-react";
import AddUser from "./AddUser";
import USW from "./wireframes/USW.jsx";
import EditUser from "./EditUser.jsx";

const UsersComponent = () => {
  const [users, setUsers] = useState([]);
  const [addUserModelOpen, setAddUserModelOpen] = useState(false);
  const [editUserModelOpen, setEditUserModelOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/admin/api/users");
        const data = await response.json();
        console.log(data);
        setUsers(data);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
      setLoading(false);
    };

    getAllUsers();
  }, []);

  const handleAddUser = async (userData) => {
    console.log(userData);
    setLoading(true);

    try {
      if (userData) {
        const response = await fetch(
          "http://localhost:8000/admin/api/users/add",
          {
            method: "POST",
            body: userData,
          }
        );
        const data = await response.json();
        console.log(data.user);
        if (response.ok) {
          setAddUserModelOpen(false);
          setLoading(false);
        }
        setUsers((prev) => [...prev, data.user]);
        setTimeout(() => {
          setLoading(false); // 🔹 Ensure state updates after API completes
          setAddUserModelOpen(false); // 🔹 Close modal after successful submit
        }, 500);
      }
      return null;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleEditUser = async (userData) => {
    // Handle user edit logic here
    console.log(userData);
    setLoading(true);
    try {
      if (userData) {
        const response = await fetch(
          "http://localhost:8000/admin/api/users/edit",
          {
            method: "POST",
            body: userData,
          }
        );
        const data = await response.json();
        if (response.ok) {
          setEditUserModelOpen(false);
          setLoading(false);
          setUsers((prev) => prev.filter((user) => user.id !== data.user.id));
        }
        setUsers((prev) => [...prev, data.user]);
        setTimeout(() => {
          setLoading(false); // 🔹 Ensure state updates after API completes
          setEditUserModelOpen(false); // 🔹 Close modal after successful submit
        }, 500);
      }
      return null;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDeleteUser = async (user) => {
    const confirmDelete = window.prompt(
      `Are you sure you want to delete ${user.username}, type 'yes' to confirm`
    );
    // Handle user deletion logic here
    try {
      if (confirmDelete === "yes") {
        const response = await fetch(
          `http://localhost:8000/admin/api/users/delete/${user.id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setUsers((prev) => prev.filter((user) => user.id !== user.id));
        }
      }
      return;
    } catch (error) {}
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.username
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(filteredUsers.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        {loading ? (
          <h1 className="text-2xl font-bold text-gray-900">Users Loading...</h1>
        ) : (
          <h1 className="text-2xl font-bold text-gray-900">
            Users{" "}
            <span className="text-blue-600 font-extrabold">{users.length}</span>
          </h1>
        )}
        <p className="text-gray-500">
          Manage your team members and their account permissions here.
        </p>
      </div>

      {/* Actions Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search and Filters */}
        <div className="flex flex-1 items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Add User Button */}
        <button
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => setAddUserModelOpen(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add User
        </button>
      </div>

      {/* Users Table */}
        {users.length === 0 && (
          <USW/>
        )}
      <div className="bg-white rounded-lg overflow-x-auto shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={selectedUsers.length === filteredUsers.length}
                  onChange={handleSelectAll}
                />
              </th> */}
              <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <ImageIcon size={20}/>
              </th>
              <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                  />
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {
                          user.image ?(
                            <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full" />
                          ):(
                            <div className="border rounded-full border-black w-10 h-10 flex justify-center items-center"><ImageIcon size={20}/></div>
                          )
                        }
                      </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 min-w-20 px-2 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 font-medium">
                        {user.username}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : user.role === "Editor"
                        ? "bg-blue-100 text-blue-800"
                        : user.role === "Manager" 
                        ? "bg-green-100 text-green-800"
                        :"bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.lastLogin).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      className={`${user.role === "admin" ? "cursor-not-allowed text-gray-400" : "hover:text-blue-600"}`}
                      disabled={user.role === "admin"}
                      onClick={() => {
                        setEditUserModelOpen(true);
                        setUser(user);
                      }}
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      className={`${user.role === "admin" ? "cursor-not-allowed text-gray-400" : "hover:text-red-600"}`}
                      onClick={() => handleDeleteUser(user)}
                      disabled={user.role === "admin"}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddUser
        isOpen={addUserModelOpen}
        isloading={loading}
        onClose={() => setAddUserModelOpen(false)}
        onSubmit={handleAddUser}
      />
      <EditUser
        isOpen={editUserModelOpen}
        isloading={loading}
        user={user}
        onClose={() => setEditUserModelOpen(false)}
        onSubmit={handleEditUser}
      />
      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6 mt-4 rounded-lg">
        <div className="flex items-center">
          <span className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">{users.length}</span> of{" "}
            <span className="font-medium">{users.length}</span> results
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersComponent;
