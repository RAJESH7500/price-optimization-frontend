import React, { useState, useEffect } from "react";
import Header from "./Header";
import Toolbar from "./Toolbar";
import { BASE_URL } from "../constant";
import axios from "axios";
import Loader from "./Loader";

const PriceOptimizationTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [searchText, setSearchtext] = useState("");
  const [selectedFilter, setSelectedFilter] = useState({
    isOpen: false,
    value: null,
  });

  useEffect(() => {
    fetchData();
  }, [category, searchText, selectedFilter]);

  const fetchData = async () => {
    const url = `${BASE_URL}/api/products?category=${category}${
      !searchText ? "" : "&name=" + searchText
    }${selectedFilter.value ? "&order_by=" + selectedFilter.value : ""}`;
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await axios({
        url: url,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log("error occured ", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      {loading ? <Loader /> : null}
      <Header />
      <Toolbar
        setCategory={setCategory}
        setSearchtext={setSearchtext}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        isPricePage={true}
      />
      <div className="p-4">
        <div className="bg-zinc-800 rounded-lg overflow-hidden">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right table-auto overflow-scroll">
              <thead className="text-xs bg-dark text-white">
                <tr>
                  <th scope="col" className="px-6 w-64 py-3">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 w-64 py-3">
                    Product Category
                  </th>
                  <th scope="col" className="px-6 w-96 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Cost Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Selling Price
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Optimized Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    className={
                      index % 2 === 0 ? "bg-white bg-gray-300" : "bg-white"
                    }
                  >
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">{item.description}</td>
                    <th scope="row" className="px-6 py-4">
                      $ {item.cost_price}
                    </th>
                    <td className="px-6 py-4">$ {item.selling_price}</td>

                    <td className="px-6 py-4">
                      <div className="flex flex-row items-center justify-between">
                        <p>${item.selling_price}</p>
                        <p className="ml-5 text-emerald-600">
                          ${item.optimized_price}
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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

export default PriceOptimizationTable;
