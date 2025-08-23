/*
 * SecurePass - Professional Password Generator
 * Copyri      <MagicCard
        className="bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md border border-white/30"
        gradientColor="#1f2937"
        gradientOpacity={0.2}
        gradientFrom="#3b82f6"
        gradientTo="#6366f1"
      > 2025 Chamath Dilshan. All rights reserved.
 *
 * This software is proprietary and confidential. Unauthorized copying,
 * modification, distribution, or use is strictly prohibited.
 *
 * Contact: chamamcolonne@gmail.com
 */

import { useState } from "react";
import { MagicCard } from "./magicui/magic-card";
import { RainbowButton } from "./magicui/rainbow-button";
import { TextAnimate } from "./magicui/text-animate";

interface SavePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string; website?: string; notes?: string }) => void;
  password: string;
  strength: string;
}

const SavePasswordModal = ({
  isOpen,
  onClose,
  onSave,
  password,
  strength,
}: SavePasswordModalProps) => {
  const [title, setTitle] = useState("");
  const [website, setWebsite] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      website: website.trim() || undefined,
      notes: notes.trim() || undefined,
    });

    // Reset form
    setTitle("");
    setWebsite("");
    setNotes("");
    onClose();
  };

  const handleClose = () => {
    setTitle("");
    setWebsite("");
    setNotes("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <MagicCard
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
        gradientColor="#1f2937"
        gradientOpacity={0.15}
        gradientFrom="#3b82f6"
        gradientTo="#6366f1"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <TextAnimate
              animation="slideRight"
              by="word"
              className="text-xl font-bold text-gray-800"
            >
              Save Password
            </TextAnimate>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Password Preview */}
          <div className="bg-gray-50 rounded-lg p-3 border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Password:
              </span>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
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
            <div className="font-mono text-sm text-gray-800 break-all bg-white px-3 py-2 rounded border">
              {password}
            </div>
          </div>

          {/* Title (Required) */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Gmail Account, Bank Login, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              required
              autoFocus
            />
          </div>

          {/* Website/App (Optional) */}
          <div>
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Website/App <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="e.g., gmail.com, facebook.com, MyBankApp"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>

          {/* Notes (Optional) */}
          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Notes <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes or details..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <RainbowButton
              type="submit"
              disabled={!title.trim()}
              className="flex-1 px-4 py-2 font-medium"
              size="default"
            >
              Save Password
            </RainbowButton>
          </div>
        </form>
      </MagicCard>
    </div>
  );
};

export default SavePasswordModal;
