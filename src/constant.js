export const BASE_URL =
  process.env.BASE_URL || 'https://price-optimization-backend.onrender.com';
export const FORECAST_HEADERS = [
  { name: 'Product Name', value: 'name' },
  { name: 'Product Category', value: 'category' },
  { name: 'Cost Price', value: 'cost_price' },
  { name: 'Selling Price', value: 'selling_price' },
  { name: 'Available Stock', value: 'stock_available' },
  { name: 'Units Sold', value: 'units_sold' },
  { name: 'Calculated Demand Forecast', value: 'demand_forecast' },
];

export const MANAGE_PRODUCT_HEADERS = [
  { name: 'Product Name', value: 'name' },
  { name: 'Product Category', value: 'category' },
  { name: 'Cost Price', value: 'cost_price' },
  { name: 'Selling Price', value: 'selling_price' },
  { name: 'Description Price', value: 'description' },
  { name: 'Available Stock', value: 'stock_available' },
  { name: 'Units Sold', value: 'units_sold' },
  { name: 'Action', value: 'action' },
];
