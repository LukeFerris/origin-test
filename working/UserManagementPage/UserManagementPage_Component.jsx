// ["UserManagementPage", "Component"]    


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, createUser, updateUser, deleteUser, selectUser } from "./AdminSlice_Store";
import UserForm from './UserForm_Component';
import UserList from './UserList_Component';
import { PlusIcon } from '@heroicons/react/24/solid';

export default function UserManagementPage_Component() {
  const dispatch = useDispatch();
  const { users, error, isLoading } = useSelector(state => state.adminState);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users on component mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Handler for adding a new user
  const handleAddUser = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  // Handler for editing a user
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  // Handler for canceling form
  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedUser(null);
  };

  // Handler for form submission
  const handleSubmitForm = (userData) => {
    if (selectedUser) {
      dispatch(updateUser({ userId: selectedUser.id, updates: userData }));
    } else {
      dispatch(createUser(userData));
    }
    setShowForm(false);
    setSelectedUser(null);
  };

  // Handler for deleting a user
  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      
      {/* Add New User Button */}
      <button
        onClick={handleAddUser}
        className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
        aria-label="Add new user"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        Add New User
      </button>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center items-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* User Form */}
      {showForm && (
        <div className="mb-6">
          <UserForm
            user={selectedUser}
            onSubmit={handleSubmitForm}
            onCancel={handleCancelForm}
          />
        </div>
      )}

      {/* User List */}
      <UserList
        users={users}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  );
}