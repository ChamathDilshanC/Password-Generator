import toast from "react-hot-toast";
import { MagicCard } from "./magicui/magic-card";

interface HistoryItem {
  id: string;
  password: string;
  strength: string;
  title: string;
  website?: string;
  notes?: string;
  createdAt: { seconds: number };
}

interface PasswordHistoryProps {
  history: HistoryItem[];
  historyError: string | null;
  onClearHistory: () => void;
}

const PasswordHistory = ({
  history,
  historyError,
  onClearHistory,
}: PasswordHistoryProps) => {
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
    <MagicCard
      className="bg-white/30 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/30"
      gradientColor="#8b5cf6"
      gradientOpacity={0.15}
      gradientFrom="#ec4899"
      gradientTo="#8b5cf6"
    >
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
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-gray-800">Password History</h2>
          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
              title="Clear all history"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H9a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>
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
          {history.map((item, index) => (
            <div
              key={item.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors transform hover:scale-[1.02] duration-200"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: "blurInUp 0.6s ease-out forwards",
              }}
            >
              <div className="space-y-2">
                {/* Title and Website */}
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm truncate">
                    {item.title}
                  </h3>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      item.strength === "Strong"
                        ? "text-green-700 bg-green-100"
                        : item.strength === "Medium"
                        ? "text-yellow-700 bg-yellow-100"
                        : "text-red-700 bg-red-100"
                    }`}
                  >
                    {item.strength}
                  </span>
                </div>

                {/* Website/App if provided */}
                {item.website && (
                  <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded flex items-center">
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="truncate">{item.website}</span>
                  </div>
                )}

                {/* Notes if provided */}
                {item.notes && (
                  <div className="text-xs text-gray-600 italic bg-gray-50 px-2 py-1 rounded">
                    {item.notes}
                  </div>
                )}

                {/* Password with copy button */}
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

                {/* Timestamp */}
                <div className="flex justify-end">
                  <span className="text-xs text-gray-500">
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
    </MagicCard>
  );
};

export default PasswordHistory;
