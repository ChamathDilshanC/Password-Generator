/*
 * SecurePass - Professional Password Generator
 * Copyright (c) 2025 Chamath Dilshan. All rights reserved.
 *
 * This software is proprietary and confidential. Unauthorized copying,
 * modification, distribution, or use is strictly prohibited.
 *
 * Contact: chamamcolonne@gmail.com
 */

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import ConfirmationModal from "./components/ConfirmationModal";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import PasswordGeneratorCard from "./components/PasswordGeneratorCard";
import PasswordHistory from "./components/PasswordHistory";
import SavePasswordModal from "./components/SavePasswordModal";

function App() {
  const [length, setLength] = useState(12);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [number, setNumber] = useState(true);
  const [symbol, setSymbol] = useState(false);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [history, setHistory] = useState<
    Array<{
      id: string;
      password: string;
      strength: string;
      title: string;
      website?: string;
      notes?: string;
      createdAt: { seconds: number };
    }>
  >([]);
  const [historyError, setHistoryError] = useState<string | null>(null);

  // Fetch password history (no auth, for demo)
  const fetchHistory = () => {
    try {
      const saved = localStorage.getItem("passwordHistory");
      const history = saved ? JSON.parse(saved) : [];
      setHistory(history);
      setHistoryError(null);
    } catch (err: any) {
      setHistoryError("Failed to load history");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSaveClick = () => {
    if (!password) return;
    setIsSaveModalOpen(true);
  };

  const handleSave = (data: {
    title: string;
    website?: string;
    notes?: string;
  }) => {
    if (!password || !strength) return;
    try {
      const passwordEntry = {
        id: Date.now().toString(),
        password,
        strength,
        title: data.title,
        website: data.website,
        notes: data.notes,
        createdAt: { seconds: Math.floor(Date.now() / 1000) },
      };

      const currentHistory = JSON.parse(
        localStorage.getItem("passwordHistory") || "[]"
      );
      const newHistory = [passwordEntry, ...currentHistory].slice(0, 10); // Keep only last 10

      localStorage.setItem("passwordHistory", JSON.stringify(newHistory));
      fetchHistory(); // Refresh the display

      toast.success("Password saved successfully!", {
        duration: 3000,
        position: "top-right",
      });
    } catch (err: any) {
      toast.error("Failed to save password", {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  const handleClearHistoryClick = () => {
    setIsClearModalOpen(true);
  };

  const handleClearHistoryConfirm = () => {
    try {
      localStorage.removeItem("passwordHistory");
      setHistory([]);
      setHistoryError(null);
      toast.success("Password history cleared successfully!", {
        duration: 3000,
        position: "top-right",
      });
    } catch (err: any) {
      toast.error("Failed to clear history", {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  const handleGenerate = () => {
    setLoading(true);
    setError(null);

    try {
      // Password generation logic (moved to frontend)
      const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lowerChars = "abcdefghijklmnopqrstuvwxyz";
      const numberChars = "0123456789";
      const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

      let charSet = "";
      if (upper) charSet += upperChars;
      if (lower) charSet += lowerChars;
      if (number) charSet += numberChars;
      if (symbol) charSet += symbolChars;

      if (!charSet) {
        setError("Please select at least one character type");
        setPassword("");
        setStrength(null);
        setLoading(false);
        return;
      }

      let generatedPassword = "";
      for (let i = 0; i < length; i++) {
        generatedPassword += charSet.charAt(
          Math.floor(Math.random() * charSet.length)
        );
      }

      // Password strength evaluation
      const evaluateStrength = (pw: string) => {
        let score = 0;
        if (pw.length >= 12) score++;
        if (/[A-Z]/.test(pw)) score++;
        if (/[a-z]/.test(pw)) score++;
        if (/[0-9]/.test(pw)) score++;
        if (/[^A-Za-z0-9]/.test(pw)) score++;
        if (score <= 2) return "Weak";
        if (score === 3 || score === 4) return "Medium";
        return "Strong";
      };

      setPassword(generatedPassword);
      setStrength(evaluateStrength(generatedPassword));
    } catch (err: any) {
      setError(err.message || "Failed to generate password");
      setPassword("");
      setStrength(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Dual Gradient Overlay (Bottom) Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
            radial-gradient(circle 500px at 20% 100%, rgba(139,92,246,0.3), transparent),
            radial-gradient(circle 500px at 100% 80%, rgba(59,130,246,0.3), transparent)
          `,
          backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <Hero />

        <div className="py-16 px-4 password-generator-section">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="flex justify-center">
                <PasswordGeneratorCard
                  length={length}
                  setLength={setLength}
                  upper={upper}
                  setUpper={setUpper}
                  lower={lower}
                  setLower={setLower}
                  number={number}
                  setNumber={setNumber}
                  symbol={symbol}
                  setSymbol={setSymbol}
                  handleGenerate={handleGenerate}
                  handleSave={handleSaveClick}
                  loading={loading}
                  error={error}
                  password={password}
                  strength={strength}
                />
              </div>

              <div className="flex justify-center">
                <PasswordHistory
                  history={history}
                  historyError={historyError}
                  onClearHistory={handleClearHistoryClick}
                />
              </div>
            </div>
          </div>
        </div>

        <Footer />
        <Toaster />
      </div>

      {/* Save Password Modal */}
      <SavePasswordModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSave}
        password={password}
        strength={strength || ""}
      />

      {/* Clear History Confirmation Modal */}
      <ConfirmationModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={handleClearHistoryConfirm}
        title="Clear Password History"
        message="Are you sure you want to delete all saved passwords? This action cannot be undone."
        confirmText="Clear All"
        cancelText="Cancel"
        dangerous={true}
      />
    </div>
  );
}

export default App;
