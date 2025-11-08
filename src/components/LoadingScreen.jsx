const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 text-lg">Loading products...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
