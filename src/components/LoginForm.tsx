"use client";

import { useState } from "react";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    setLoading(false);

    if (!response.ok) {
      setError("The password is not correct.");
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <main className="admin-shell login-shell">
      <form className="admin-panel login-panel" onSubmit={onSubmit}>
        <span className="section-kicker">Webara admin</span>
        <h1>Sign in to edit content</h1>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoFocus
            required
          />
        </label>
        {error ? <p className="form-error">{error}</p> : null}
        <button className="primary-button" disabled={loading} type="submit">
          {loading ? "Checking..." : "Enter admin"}
        </button>
      </form>
    </main>
  );
}
