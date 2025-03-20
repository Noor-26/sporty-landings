
import React, { useState, useEffect, useContext } from 'react';
import { Trash2, Edit, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/Provider/AuthProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationModal from '../components/admin/RegistrationModal';
import DeleteConfirmationModal from '../components/admin/DeleteConfirmationModal';
import Loader from '../components/ui/Loader';

// Initial sample data
const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "01712345678",
    division: "Dhaka",
    district: "Dhaka",
    area: "Gulshan",
    address: "House 123, Road 12, Block F, Gulshan-1",
    hasJersey: true
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "01812345678",
    division: "Chittagong",
    district: "Chittagong",
    area: "Agrabad",
    address: "Apartment 45, Building B, Agrabad Commercial Area",
    hasJersey: false
  },
];

const Admin = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState(initialUsers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  const handleAddUser = (userData) => {
    const newUser = {
      ...userData,
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
    };
    setUsers([...users, newUser]);
    console.log("Added new user:", newUser);
  };

  const handleEditUser = (userData) => {
    if (selectedUser) {
      const updatedUsers = users.map(u => 
        u.id === selectedUser.id ? { ...userData, id: selectedUser.id } : u
      );
      setUsers(updatedUsers);
      console.log("Updated user:", { ...userData, id: selectedUser.id });
    }
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      const updatedUsers = users.filter(u => u.id !== selectedUser.id);
      setUsers(updatedUsers);
      console.log("Deleted user:", selectedUser);
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-24 pb-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center px-4 py-2 bg-sport-blue text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add User
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Division</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jersey Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.division}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.district}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.area}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{user.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.hasJersey
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {user.hasJersey ? 'With Jersey' : 'Without Jersey'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-3">
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() => openEditModal(user)}
                            title="Edit"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => openDeleteModal(user)}
                            title="Delete"
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
          </div>
        </div>
      </div>
      
      {/* Add User Modal */}
      <RegistrationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddUser}
      />
      
      {/* Edit User Modal */}
      <RegistrationModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={selectedUser || undefined}
        onSubmit={handleEditUser}
        isEdit={true}
      />
      
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteUser}
        userName={selectedUser?.name || ''}
      />
      
      <Footer />
    </div>
  );
};

export default Admin;
