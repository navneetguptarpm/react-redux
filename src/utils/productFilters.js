export const getFilteredAndSortedProducts = (products, filters) => {
  if (!products || products.length === 0) return [];

  let filtered = [...products];

  if (filters.category !== "all") {
    filtered = filtered.filter((p) => p.category === filters.category);
  }

  if (filters.priceRange !== "all") {
    const ranges = {
      "under-20": [0, 20],
      "20-50": [20, 50],
      "50-100": [50, 100],
      "100-500": [100, 500],
      "500-1000": [500, 1000],
      "1000-2000": [1000, 2000],
      "over-2000": [2000, Infinity],
    };
    const [min, max] = ranges[filters.priceRange];
    filtered = filtered.filter((p) => p.price >= min && p.price < max);
  }

  if (filters.rating !== "all") {
    const minRating = parseFloat(filters.rating);
    filtered = filtered.filter((p) => p.rating >= minRating);
  }

  if (filters.sortBy === "price-low") filtered.sort((a, b) => a.price - b.price);
  else if (filters.sortBy === "price-high") filtered.sort((a, b) => b.price - a.price);
  else if (filters.sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);
  else if (filters.sortBy === "name") filtered.sort((a, b) => a.title.localeCompare(b.title));

  return filtered;
};
