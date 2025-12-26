"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState<string>("");

  const [text, setText] = useState("");
  const [textHash, setTextHash] = useState("");

  const [fileHash, setFileHash] = useState("");

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
      <h1 className="text-4xl font-bold text-center text-red-500">
        Hashing Lab
      </h1>

      <section
        style={{
          marginTop: 24,
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 12,
        }}
      >
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
    </main>
  );
}
