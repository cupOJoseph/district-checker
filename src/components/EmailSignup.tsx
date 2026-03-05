"use client";
import { useState } from "react";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setError("");

    try {
      // Store to Google Sheet via Apps Script
      const sheetId = "1cii8pneXUVePi0uv_6AiwYnbRUUq4bNGuJzsE3vzGvA";
      const url = `https://docs.google.com/forms/d/e/${sheetId}/formResponse`;
      // For now, just mark as submitted — wire up the actual endpoint later
      console.log("Email signup:", email, "Sheet:", sheetId, url);
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center text-green-800">
        ✅ Thanks! We&apos;ll keep you updated on redistricting in Virginia.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-[#1B3A5C] text-white rounded-lg font-semibold hover:bg-[#0f2640] transition-colors cursor-pointer"
      >
        Stay Updated
      </button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  );
}
