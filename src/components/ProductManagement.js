import React, { useEffect, useState } from 'react';
import Header from './Header';
import Table from './Table';
import Toolbar from './Toolbar';
import { BASE_URL } from '../constant';
import axios from 'axios';
import AddProductModal from './AddProductModal';
import DemandForecastModal from './DemandForecastModal';
import Loader from './Loader';

const ProductManagement = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState('All');
  const [searchText, setSearchtext] = useState('');
  const [selectedFilter, setSelectedFilter] = useState({
    isOpen: false,
    value: null,
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isDemandForecast, setIsDemandForecast] = useState(false);
  const [selectedProductData, setSelectedProductData] = useState({
    name: '',
    description: '',
    cost_price: 0,
    selling_price: 0,
    category: '',
    stock_available: 0,
    units_sold: 0,
  });

  useEffect(() => {
    fetchData();
  }, [category, searchText, selectedFilter]);

  const fetchData = async () => {
    const url = `${BASE_URL}/api/products?category=${category}${
      !searchText ? '' : '&name=' + searchText
    }${selectedFilter.value ? '&order_by=' + selectedFilter.value : ''}`;
    const token = localStorage.getItem('token');
    try {
      setLoading(true);
      const response = await axios({
        url: url,
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      const errorMessage = JSON.parse(error?.request?.response || '').error;
      if (
        errorMessage === 'token_expired' ||
        errorMessage === 'invalid_token'
      ) {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      {loading ? <Loader /> : null}
      <Header />
      <Toolbar
        setIsOpen={setIsOpen}
        setCategory={setCategory}
        setSearchtext={setSearchtext}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        selectedProducts={selectedProducts}
        setIsDemandForecast={setIsDemandForecast}
        fetchData={fetchData}
      />
      <div className="p-4">
        <div className="bg-zinc-800 rounded-lg overflow-hidden">
          <Table
            data={data}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            setIsOpen={setIsOpen}
            setSelectedProductData={setSelectedProductData}
          />
        </div>
      </div>
      <AddProductModal
        isOpen={isOpen}
        onClose={setIsOpen}
        selectedProductData={selectedProductData}
        isUpdate={!selectedProductData.name ? false : true}
      />
      <DemandForecastModal
        isOpen={isDemandForecast}
        onClose={setIsDemandForecast}
        data={data}
        selectedProducts={selectedProducts}
      />
      {/* Footer */}
      {/* <div className="fixed bottom-0 left-0 right-0 bg-zinc-800 p-4 flex justify-end space-x-4">
        <button className="px-4 py-2 rounded-md bg-zinc-700 text-white">
          Cancel
        </button>
        <button className="px-4 py-2 rounded-md bg-emerald-400 text-black">
          Save
        </button>
      </div> */}
    </div>
  );
};

export default ProductManagement;
