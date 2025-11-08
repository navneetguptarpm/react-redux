import { AlertCircle } from "lucide-react";

const ErrorScreen = ({ error }) => {
    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-800 text-center mb-2">Error Loading Products</h2>
                <p className="text-gray-600 text-center">{error}</p>
            </div>
        </div>
    );
}

export default ErrorScreen;