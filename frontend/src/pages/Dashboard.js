import React, { useState, useEffect } from "react";
import { reviewCode } from "../services/api";
import "./Dashboard.css";

function Dashboard({ token }) {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [feedback, setFeedback] = useState("");
  const [displayedFeedback, setDisplayedFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleReview = async () => {
    try {
      if (!code.trim()) {
        setMessage({ type: "error", text: "Please enter code before reviewing." });
        return;
      }

      setLoading(true);
      setFeedback("");
      setDisplayedFeedback("");
      setMessage(null);

      const response = await reviewCode({ language, code }, token);
      setFeedback(response.data.feedback);
      setMessage({ type: "success", text: "Analysis completed successfully." });

    } catch (error) {
      setMessage({ type: "error", text: "Review failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  /* Typing Animation */
  useEffect(() => {
    if (feedback) {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedFeedback((prev) => prev + feedback[index]);
        index++;
        if (index >= feedback.length) clearInterval(interval);
      }, 10);

      return () => clearInterval(interval);
    }
  }, [feedback]);

  const handleCopy = () => {
    navigator.clipboard.writeText(feedback);
    setMessage({ type: "success", text: "Feedback copied to clipboard!" });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">

        <div className="dashboard-title">
          AI Code Review Assistant 
        </div>

        <select
          className="select-language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
        </select>

        <textarea
          className="code-textarea"
          placeholder="Paste your code here..."
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          className="review-button"
          onClick={handleReview}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Review Code"}
        </button>

        {loading && <div className="spinner"></div>}

        {message && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        {displayedFeedback && (
          <>
            <div className="feedback-box">
              {displayedFeedback}
            </div>

            <button className="copy-button" onClick={handleCopy}>
              Copy Feedback
            </button>
          </>
        )}

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>

      </div>
    </div>
  );
}

export default Dashboard;