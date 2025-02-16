import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { BASE_URL } from '../constant';
import axios from 'axios';

const AddProductModal = ({
  isOpen,
  onClose,
  selectedProductData,
  setSelectedProductData,
  isUpdate = false,
  fetchData,
}) => {
  const [product, setProduct] = useState(selectedProductData);
  useEffect(() => {
    if (isUpdate) {
      setProduct(selectedProductData);
    }
  }, [selectedProductData]);

  const handleOnChange = ({ target }) => {
    setProduct({
      ...product,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${BASE_URL}/api/products${isUpdate ? '/' + product.id : ''}`;
    const token = localStorage.getItem('token');
    try {
      await axios({
        url: url,
        method: isUpdate ? 'put' : 'post',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(product),
      });
      onClose(false);
      setSelectedProductData({
        name: '',
        description: '',
        cost_price: 0,
        selling_price: 0,
        category: '',
        stock_available: 0,
        units_sold: 0,
      });
      fetchData();
    } catch (error) {
      console.log('error occured ', error);
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-9999 bg-black/50 flex items-center justify-center">
      <div className="bg-zinc-900 rounded-lg w-[600px] p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-emerald-400 text-xl font-medium">
            {isUpdate
              ? `Edit ${selectedProductData?.name}`
              : 'Add New Products'}
          </h2>
          <button
            onClick={() => onClose(false)}
            className="text-emerald-400 hover:text-emerald-300"
          >
            <X size={24} />
          </button>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-white mb-2">Product Name :</label>
            <input
              name="name"
              onChange={handleOnChange}
              value={product.name}
              type="text"
              placeholder="Enter Product Name"
              className="w-full bg-zinc-800 text-white p-3 rounded-md placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            />
          </div>
          <div>
            <label className="block text-white mb-2">Product Category :</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleOnChange}
              placeholder="Enter Product Name"
              className="w-full bg-zinc-800 text-white p-3 rounded-md placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Cost Price :</label>
              <input
                type="number"
                name="cost_price"
                value={product.cost_price}
                onChange={handleOnChange}
                placeholder="XX,XXX,XXX"
                className="w-full bg-zinc-800 text-white p-3 rounded-md placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Selling Price :</label>
              <input
                type="number"
                name="selling_price"
                value={product.selling_price}
                onChange={handleOnChange}
                placeholder="XX,XXX,XXX"
                className="w-full bg-zinc-800 text-white p-3 rounded-md placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-white mb-2">Description :</label>
            <textarea
              placeholder="Enter Description"
              name="description"
              value={product.description}
              onChange={handleOnChange}
              rows={4}
              className="w-full bg-zinc-800 text-white p-3 rounded-md placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Available Stock :</label>
              <input
                type="number"
                name="stock_available"
                value={product.stock_available}
                onChange={handleOnChange}
                placeholder="XX,XXX,XXX"
                className="w-full bg-zinc-800 text-white p-3 rounded-md placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Units Sold :</label>
              <input
                type="number"
                name="units_sold"
                value={product.units_sold}
                onChange={handleOnChange}
                placeholder="XX,XXX,XXX"
                className="w-full bg-zinc-800 text-white p-3 rounded-md placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="px-6 py-2 rounded-md text-emerald-400 border border-emerald-400 hover:bg-emerald-400/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-emerald-400 text-black hover:bg-emerald-500"
            >
              {isUpdate ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
