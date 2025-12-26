"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState<string>("");

  const [text, setText] = useState("");
  const [textHash, setTextHash] = useState("");

  const [fileHash, setFileHash] = useState("");

  async function register() {
    setMsg("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: pass }),
    });
    const data = await res.json();
    setMsg(res.ok ? "Registered ✅" : `Error: ${data.error}`);
  }

  async function login() {
    setMsg("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: pass }),
    });
    const data = await res.json();
    setMsg(res.ok ? "Logged in ✅" : `Error: ${data.error}`);
  }

  const hashText = async () => {
    try {
      const enc = new TextEncoder();
      const data = enc.encode(text);

      const digest = await crypto.subtle.digest("SHA-256", data);
      const hashHex = Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      setTextHash(hashHex);
    } catch (err) {
      console.error(err);
      setTextHash("Error (see console)");
    }
  };

  return (
    <main
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: 24,
        fontFamily: "system-ui",
      }}
    >
      <h1>Hashing Lab (Next.js + MongoDB)</h1>

      <section
        style={{
          marginTop: 24,
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 12,
        }}
      >
        <h2>1) Password Hashing (bcrypt)</h2>
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <div style={{ marginTop: 8 }}>
          <button onClick={register}>Register</button>
          <button onClick={login} style={{ marginLeft: 8 }}>
            Login
          </button>
        </div>
        <p>{msg}</p>
      </section>

      <section
        style={{
          marginTop: 24,
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 12,
        }}
      >
        <h2>2) SHA-256 Text</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          style={{ width: "100%" }}
        />
        <button type="button" onClick={hashText} style={{ marginTop: 8 }}>
          Hash
        </button>
        <p style={{ wordBreak: "break-all" }}>{textHash}</p>
      </section>

      <section
        style={{
          marginTop: 24,
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 12,
        }}
      >
        <h2>3) File Integrity (SHA-256)</h2>
        <input
          type="file"
          onChange={(e) => e.target.files?.[0] && hashFile(e.target.files[0])}
        />
        <p style={{ wordBreak: "break-all" }}>{fileHash}</p>
      </section>
    </main>
  );
}
