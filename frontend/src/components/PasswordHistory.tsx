interface HistoryItem {
  id: string;
  password: string;
  strength: string;
  createdAt: { seconds: number };
}

import toast from "react-hot-toast";

interface PasswordHistoryProps {
  history: HistoryItem[];
  historyError: string | null;
}

const PasswordHistory = ({ history, historyError }: PasswordHistoryProps) => {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Password copied to clipboard!", {
        duration: 2000,
        position: "top-right",
      });
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast.error("Failed to copy password", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-200">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl mb-3">
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fillRule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Password History
        </h2>
        <p className="text-gray-600 text-sm">
          Your recently generated passwords
        </p>
      </div>

      {historyError ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm font-medium text-center">
            {historyError}
          </p>
        </div>
      ) : history.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-sm font-medium">No history found</p>
          <p className="text-gray-400 text-xs mt-1">
            Generate and save passwords to see them here
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <div className="space-y-2">
                <div className="font-mono text-sm text-gray-800 break-all bg-white px-3 py-2 rounded border flex items-center justify-between">
                  <span className="flex-1">{item.password}</span>
                  <button
                    onClick={() => copyToClipboard(item.password)}
                    className="ml-2 p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Copy password"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`font-semibold px-2 py-1 rounded-full ${
                      item.strength === "Strong"
                        ? "text-green-700 bg-green-100"
                        : item.strength === "Medium"
                        ? "text-yellow-700 bg-yellow-100"
                        : "text-red-700 bg-red-100"
                    }`}
                  >
                    {item.strength}
                  </span>
                  <span className="text-gray-500">
                    {item.createdAt?.seconds
                      ? new Date(item.createdAt.seconds * 1000).toLocaleString()
                      : ""}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PasswordHistory;
