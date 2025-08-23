/*
 * SecurePass - Professional Password Generator
 * Copyright (c) 2025 Chamath Dilshan. All rights reserved.
 *
 * This software is proprietary and confidential. Unauthorized copying,
 * modification, distribution, or use is strictly prohibited.
 *
 * Contact: chamamcolonne@gmail.com
 */

import { MagicCard } from "./magicui/magic-card";
import { RainbowButton } from "./magicui/rainbow-button";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  dangerous?: boolean;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  dangerous = false,
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <MagicCard className="bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md border border-white/30">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
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
        <div className="p-6">
          <div className="flex items-start space-x-4">
            {dangerous && (
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
              </div>
            )}
            <div className="flex-1">
              <p className="text-gray-700 leading-relaxed">{message}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              {cancelText}
            </button>
            <RainbowButton
              onClick={handleConfirm}
              className={`flex-1 px-4 py-2 font-medium ${
                dangerous ? "text-white" : ""
              }`}
              variant={dangerous ? "default" : "default"}
            >
              {confirmText}
            </RainbowButton>
          </div>
        </div>
      </MagicCard>
    </div>
  );
};

export default ConfirmationModal;
