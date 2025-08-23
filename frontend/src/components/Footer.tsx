const Footer = () => {
  return (
    <footer className="bg-white/20 backdrop-blur-md text-gray-800 py-12 border-t border-white/20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Password Generator
            </h3>
            <p className="text-gray-600 text-sm">
              Generate secure passwords with advanced customization options.
              Keep your accounts safe with strong, unique passwords.
            </p>
          </div>

          {/* Features Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-700">Features</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-purple-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Custom password length
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Multiple character types
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Password strength analysis
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-purple-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Password history
              </li>
            </ul>
          </div>

          {/* Contact/Info Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-200">About</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Built with modern web technologies</p>
              <p>React + TypeScript + Tailwind CSS</p>
              <p>Firebase Hosting + MagicUI Components</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Chamath Dilshan. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span>Made with ❤️ for security</span>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Secure & Private</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
