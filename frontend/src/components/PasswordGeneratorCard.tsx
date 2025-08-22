import toast from "react-hot-toast";

interface PasswordGeneratorCardProps {
  length: number;
  setLength: (length: number) => void;
  upper: boolean;
  setUpper: (upper: boolean) => void;
  lower: boolean;
  setLower: (lower: boolean) => void;
  number: boolean;
  setNumber: (number: boolean) => void;
  symbol: boolean;
  setSymbol: (symbol: boolean) => void;
  handleGenerate: () => void;
  handleSave: () => void;
  loading: boolean;
  error: string | null;
  password: string;
  strength: string | null;
}

const PasswordGeneratorCard = ({
  length,
  setLength,
  upper,
  setUpper,
  lower,
  setLower,
  number,
  setNumber,
  symbol,
  setSymbol,
  handleGenerate,
  handleSave,
  loading,
  error,
  password,
  strength,
}: PasswordGeneratorCardProps) => {
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
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Generate Password
        </h2>
        <p className="text-gray-600 text-sm">
          Customize your password settings below
        </p>
      </div>

      <div className="space-y-6">
        {/* Length Slider */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-gray-700">
              Password Length
            </label>
            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
              {length}
            </span>
          </div>
          <input
            type="range"
            min={6}
            max={32}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                ((length - 6) / (32 - 6)) * 100
              }%, #e5e7eb ${((length - 6) / (32 - 6)) * 100}%, #e5e7eb 100%)`,
            }}
          />
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={upper}
              onChange={(e) => setUpper(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Uppercase</span>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={lower}
              onChange={(e) => setLower(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Lowercase</span>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={number}
              onChange={(e) => setNumber(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Numbers</span>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={symbol}
              onChange={(e) => setSymbol(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Symbols</span>
          </label>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span>Generating...</span>
            </div>
          ) : (
            "Generate Password"
          )}
        </button>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Password Display */}
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 min-h-[60px] flex items-center justify-between">
            {password ? (
              <>
                <span className="font-mono text-lg text-gray-800 break-all text-center select-all flex-1">
                  {password}
                </span>
                <button
                  onClick={() => copyToClipboard(password)}
                  className="ml-3 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Copy password"
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
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <span className="text-gray-500 text-sm">
                Your password will appear here
              </span>
            )}
          </div>

          {/* Save Button */}
          {password && (
            <button
              onClick={handleSave}
              className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md"
            >
              Save Password
            </button>
          )}

          {/* Strength Indicator */}
          {strength && (
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Strength:
              </span>
              <span
                className={`text-sm font-bold px-3 py-1 rounded-full ${
                  strength === "Strong"
                    ? "text-green-700 bg-green-100"
                    : strength === "Medium"
                    ? "text-yellow-700 bg-yellow-100"
                    : "text-red-700 bg-red-100"
                }`}
              >
                {strength}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordGeneratorCard;
