

import React, { useState, useEffect } from 'react';
import api from "../../axiosConfig";
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';

const AdminCategory = () => {
  const [categories, setCategories] = useState([]); // Changed to array
  const [formData, setFormData] = useState({
    name: '',
    subcategories: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch existing categories
  const fetchCategories = async () => {
    try {
      const response = await api.get(`/api/conference-categories`);
      setCategories(response.data);
    } catch (error) {
      toast.error('Failed to load categories');
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const subcategoriesArray = formData.subcategories
        .split(',')
        .map(item => item.trim())
        .filter(item => item);

      if (editingId) {
        await api.put(`/api/admin/conference-categories/${editingId}`, {
          name: formData.name,
          subcategories: subcategoriesArray
        });
        toast.success('Category updated successfully!');
      } else {
        await api.post(`/api/admin/conference-categories`, {
          name: formData.name,
          subcategories: subcategoriesArray
        });
        toast.success('Category added successfully!');
      }

      await fetchCategories();
      setFormData({ name: '', subcategories: '' });
      setEditingId(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      subcategories: category.subcategories.join(', ')
    });
    setEditingId(category._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    
    try {
      await api.delete(`/api/admin/conference-categories/${id}`);
      toast.success('Category deleted successfully!');
      await fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete category');
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#d5d8dc]">
      <Sidebar />
      
      <div className="flex-1 px-10 ml-[260px] py-8">
        <div className="w-full bg-white/40 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg">
          <h3 className="text-3xl font-bold text-black uppercase mb-6 text-center">
            Conference Proceedings Category
          </h3>

          {/* Add/Edit Category Form */}
          <div className="mb-8 bg-white/70 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-4 text-center">
              {editingId ? 'Edit Category' : 'Add New Category'}
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-lg font-bold text-black uppercase text-center mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg"
                  required
                />
              </div>
              
              <div>
                <label className="block text-lg font-bold text-black uppercase text-center mb-2">
                  Subcategories (comma separated)
                </label>
                <input
                  type="text"
                  name="subcategories"
                  value={formData.subcategories}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-[#75609c] rounded-lg bg-white text-black text-center outline-none transition focus:border-[#0047AB] focus:shadow-lg"
                  placeholder="e.g., Fiction, Non-fiction, Science"
                />
              </div>
              
              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-2 text-white font-bold uppercase bg-[#10263e] rounded-lg transition hover:bg-[#357ABD] hover:shadow-md hover:scale-105 active:scale-95 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading 
                    ? (editingId ? 'Updating...' : 'Adding...') 
                    : (editingId ? 'Update Category' : 'Add Category')}
                </button>
                
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ name: '', subcategories: '' });
                      setEditingId(null);
                    }}
                    className="px-6 py-2 text-white font-bold uppercase bg-gray-600 rounded-lg transition hover:bg-gray-700 hover:shadow-md hover:scale-105 active:scale-95"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Existing Categories List */}
          <div className="bg-white/70 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-4 text-center">Existing Categories</h4>
            {categories.length === 0 ? (
              <p className="text-gray-500 text-center">No categories found</p>
            ) : (
              <div className="space-y-6">
                {categories.map((category) => (
                  <div key={category._id} className="border-b border-gray-300 pb-4">
                    <div className="flex justify-between items-center">
                      <h5 className="font-bold text-lg text-[#10263e]">{category.name}</h5>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(category)}
                          className="text-[#0047AB] hover:text-[#10263e] font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    {category.subcategories?.length > 0 ? (
                      <ul className="mt-2 pl-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {category.subcategories.map((sub, index) => (
                          <li key={index} className="text-gray-700 bg-gray-100/50 px-3 py-1 rounded">
                            {sub}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-sm mt-2 pl-6">No subcategories</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategory;