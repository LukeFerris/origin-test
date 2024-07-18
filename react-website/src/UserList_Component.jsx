// ["UserList", "Component"]    


import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectUser, deleteUser } from "./AdminSlice_Store";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function UserList_Component() {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector(state => state.adminState);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Calculate pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle edit user
  const handleEditUser = (user) => {
    dispatch(selectUser(user));
  };

  // Handle delete user
  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId));
    }
  };

  // Render loading state
  if (isLoading) {
    return <div className="text-center py-4">Loading users...</div>;
  }

  // Render error state
  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  // Render empty state
  if (users.length === 0) {
    return <div className="text-center py-4">No users found</div>;
  }

  return (
    <div className="w-full align-top text-left">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Username</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="p-2">{user.username}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">
                <button
                  onClick={() => handleEditUser(user)}
                  className="mr-2 p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  aria-label={`Edit user ${user.username}`}
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                  aria-label={`Delete user ${user.username}`}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            aria-label={`Go to page ${page}`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}