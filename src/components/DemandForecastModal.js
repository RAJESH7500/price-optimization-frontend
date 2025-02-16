import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { X } from "lucide-react";
import { FORECAST_HEADERS } from "../constant";

export default function DemandForecastModal({
  isOpen,
  onClose,
  data,
  selectedProducts,
}) {
  const demandData = data.filter((item) => selectedProducts.includes(item.id));
  const chartData = demandData.map((item) => {
    return {
      name: item?.name,
      demand: Number(item?.demand_forecast),
      price: Number(item.optimized_price),
    };
  });
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg w-4/5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Demand Forecast</h2>
          <button onClick={() => onClose(false)} className="text-white">
            <X size={24} />
          </button>
        </div>

        {/* Chart Section */}
        <div className="bg-black p-4 rounded-md mb-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip
                contentStyle={{ backgroundColor: "#333", border: "none" }}
              />
              <Line
                type="monotone"
                dataKey="demand"
                stroke="purple"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="cyan"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 text-sm mt-2">
            <span className="text-purple-400">● Product Demand</span>
            <span className="text-cyan-400">● Selling Price</span>
          </div>
        </div>

        <div className="max-h-60  overflow-y-auto border border-gray-700 rounded-md">
          <table className="w-full text-left border border-gray-700">
            <thead className="bg-gray-800 sticky top-0">
              <tr>
                {FORECAST_HEADERS.map((header) => (
                  <th
                    key={header.value}
                    className="px-4 py-2 border border-gray-700"
                  >
                    {header?.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {demandData.map((product, index) => (
                <tr key={index} className="border border-gray-700">
                  {FORECAST_HEADERS.map((header, i) => (
                    <td
                      key={i}
                      className={`px-4 py-2 border border-gray-700 ${
                        i === 6 ? "bg-cyan-700 text-white font-bold" : ""
                      }`}
                    >
                      {product[header.value]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
