import React from 'react';
import { Box, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-zinc-900 p-8">
      <div className="flex justify-center mb-12">
        <div className="text-white text-3xl font-bold">
          BCG<span className="text-emerald-400">X</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-white text-4xl font-bold mb-4">
            Price Optimization Tool
          </h1>
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col h-full">
              <div className="mb-8">
                <Box className="w-12 h-12 text-black" />
              </div>
              <h2 className="text-2xl font-bold mb-4">
                Create and Manage Product
              </h2>
              <p className="text-gray-600 mb-8 flex-grow">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="flex justify-start">
                <Link to="/manage-product">
                  <ArrowRight className="w-6 h-6 text-black" />
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col h-full">
              <div className="mb-8">
                <Users className="w-12 h-12 text-black" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Pricing Optimization</h2>
              <p className="text-gray-600 mb-8 flex-grow">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="flex justify-start">
                <Link to="/optimize-price">
                  <ArrowRight className="w-6 h-6 text-black" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
