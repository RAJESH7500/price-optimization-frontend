import React from "react";
import { ArrowLeft, Search, Filter, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

const Toolbar = ({
  setIsOpen,
  setCategory,
  setSearchtext,
  selectedFilter,
  setSelectedFilter,
  selectedProducts,
  setIsDemandForecast,
  isPricePage = false,
  fetchData,
}) => {
  return (
    <div className="bg-zinc-800 p-4 flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-4">
        <Link
          to="/dashboard"
          className="text-white flex items-center space-x-2"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </Link>
        <h2 className="text-white text-lg">Create and Manage Product</h2>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-4 bg-emerald-400 rounded-full"></div>
          <span className="text-white">
            {isPricePage ? "Pricing Optimization" : "With Demand Forecast"}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input
            type="text"
            onChange={(e) => setSearchtext(e.target.value)}
            placeholder="Search"
            className="bg-zinc-900 text-white pl-10 pr-4 py-2 rounded-md w-64 focus:outline-none focus:ring-1 focus:ring-emerald-400"
          />
        </div>

        <div className="flex items-center space-x-2 text-white">
          <span>Category:</span>
          <select
            className="bg-zinc-700 px-4 py-2 rounded-md flex items-center space-x-2"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option name="All">All</option>
            <option name="Electronics">Electronics</option>
            <option name="Apparel">Apparel</option>
            <option name="Transportation">Transportation</option>
            <option name="Wearables">Wearables</option>
            <option name="Outdoor & Sports">Outdoor & Sports</option>
          </select>
        </div>

        <button
          className="text-white flex items-center space-x-2 bg-zinc-700 px-4 py-2 rounded-md"
          onClick={() => setSelectedFilter({ ...selectedFilter, isOpen: true })}
        >
          <Filter size={16} />
          <span>Filter</span>
        </button>
        {selectedFilter?.isOpen ? (
          <div
            id="dropdown"
            class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
          >
            <p className="py-2 text-sm text-gray-700 dark:text-gray-200 pl-3">
              Sort By
            </p>
            <ul
              class="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li className="flex flex-row pl-2">
                <input
                  type="checkbox"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  checked={selectedFilter.value === "name"}
                  onChange={(e) =>
                    setSelectedFilter({ isOpen: false, value: "name" })
                  }
                />
                <span className="ml-3">Name</span>
              </li>
              <li className="flex flex-row pl-2">
                <input
                  type="checkbox"
                  checked={selectedFilter.value === "category"}
                  onChange={(e) =>
                    setSelectedFilter({ isOpen: false, value: "category" })
                  }
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                />
                <span className="ml-3">Category</span>
              </li>
              <li className="flex flex-row pl-2">
                <input
                  type="checkbox"
                  checked={selectedFilter.value === "cost_price"}
                  onChange={(e) =>
                    setSelectedFilter({ isOpen: false, value: "cost_price" })
                  }
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                />
                <span className="ml-3">Cost Price</span>
              </li>
              <li className="flex flex-row pl-2">
                <input
                  type="checkbox"
                  checked={selectedFilter.value === "selling_price"}
                  onChange={(e) =>
                    setSelectedFilter({ isOpen: false, value: "selling_price" })
                  }
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                />
                <span className="ml-3">Selling Price</span>
              </li>
            </ul>
          </div>
        ) : null}

        {!isPricePage ? (
          <>
            {" "}
            <button
              className="bg-emerald-400 text-black px-4 py-2 rounded-md"
              onClick={() => setIsOpen(true)}
            >
              Add New Products
            </button>
            <button
              className="bg-emerald-400 text-black px-4 py-2 rounded-md"
              disabled={selectedProducts.length === 0 ? true : false}
              onClick={() => setIsDemandForecast(true)}
            >
              Demand Forecast
            </button>
            <button
              className="bg-emerald-400 text-black px-4 py-2 rounded-md"
              onClick={() => fetchData()}
            >
              <RefreshCcw />
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Toolbar;
