import React from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { BASE_URL } from '../constant';
import axios from 'axios';

const Table = ({
  data,
  selectedProducts,
  setSelectedProducts,
  setSelectedProductData,
  setIsOpen,
  fetchData,
}) => {
  const handleCheckBoxClick = (id) => {
    if (selectedProducts?.includes(id)) {
      setSelectedProducts(selectedProducts?.filter((item) => item !== id));
    } else setSelectedProducts([...selectedProducts, id]);
  };

  const handleProductDelete = async (product_id) => {
    const url = `${BASE_URL}/api/products/${product_id}`;
    const token = localStorage.getItem('token');
    try {
      await axios({
        url: url,
        method: 'delete',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData();
    } catch (error) {
      const errorMessage = JSON.parse(error?.request?.response || '').error;
      if (
        errorMessage === 'token_expired' ||
        errorMessage === 'invalid_token'
      ) {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
      }
    }
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right table-auto overflow-scroll">
        <thead className="text-xs bg-dark text-white">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>

            <th scope="col" className="px-6 py-3">
              Product Name
            </th>
            <th scope="col" className="px-6 py-3">
              Product Category
            </th>
            <th scope="col" className="px-6 py-3">
              Cost Price
            </th>
            <th scope="col" className="px-6 py-3">
              Selling Price
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Available Stock
            </th>
            <th scope="col" className="px-6 py-3">
              Units Sold
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr
              className={index % 2 === 0 ? 'bg-white bg-gray-300' : 'bg-white'}
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    onChange={() => handleCheckBoxClick(item.id)}
                    checked={selectedProducts?.includes(item.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>

              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">{item.category}</td>
              <th scope="row" className="px-6 py-4">
                $ {item.cost_price}
              </th>
              <td className="px-6 py-4">$ {item.selling_price}</td>
              <td className="px-6 py-4">{item.description}</td>
              <td className="px-6 py-4">{item.stock_available}</td>
              <td className="px-6 py-4">{item.units_sold}</td>
              <td className="flex items-center px-6 py-4">
                <div className="flex items-center space-x-4">
                  <button className="text-gray-400">
                    <Eye size={16} />
                  </button>
                  <button
                    className="text-gray-400"
                    onClick={() => {
                      setSelectedProductData(item);
                      setIsOpen(true);
                    }}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="text-gray-400"
                    onClick={() => handleProductDelete(item.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
