export const Button = ({children, type, loading}) => {
  return (
    <button type={type} disabled={loading}
            className="bg-green-800 text-gray-100 rounded px-4 py-2 hover:bg-green-700 my-2">
      {loading ? 'Loading...' : children}
    </button>
  );
};