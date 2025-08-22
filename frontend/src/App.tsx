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
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import PasswordGeneratorCard from "./components/PasswordGeneratorCard";
import PasswordHistory from "./components/PasswordHistory";

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
  const [history, setHistory] = useState<
    Array<{
      id: string;
      password: string;
      strength: string;
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

  const handleSave = () => {
    if (!password) return;
    try {
      const passwordEntry = {
        id: Date.now().toString(),
        password,
        strength,
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Hero />

      <div className="py-16 px-4">
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
                handleSave={handleSave}
                loading={loading}
                error={error}
                password={password}
                strength={strength}
              />
            </div>

            <div className="flex justify-center">
              <PasswordHistory history={history} historyError={historyError} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
