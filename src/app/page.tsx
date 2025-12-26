"use client";

import { useState } from "react";

async function sha256Hex(input: string) {
  const enc = new TextEncoder();
  const data = enc.encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function Home() {
  const [msg, setMsg] = useState("");

  const [text, setText] = useState("");
  const [textHash, setTextHash] = useState("");

  const [verifyText, setVerifyText] = useState("");
  const [verifyHash, setVerifyHash] = useState("");
  const [verifyResult, setVerifyResult] = useState("");

  const [targetHash, setTargetHash] = useState("");
  const [dictionary, setDictionary] = useState(
    ["apple", "banana", "cat", "dog", "hello", "password", "123456"].join("\n")
  );
  const [reverseResult, setReverseResult] = useState("");

  const hashText = async () => {
    const hash = await sha256Hex(text);
    setTextHash(hash);
    setMsg("Hashed ✅");
  };

  const verify = async () => {
    const computed = await sha256Hex(verifyText);
    setVerifyResult(
      computed === verifyHash.trim().toLowerCase()
        ? "Match ✅ (הטקסט תואם ל-Hash)"
        : "No match ❌"
    );
  };

  const reverseDemo = async () => {
    const words = dictionary
      .split("\n")
      .map((w) => w.trim())
      .filter(Boolean);

    for (const word of words) {
      const h = await sha256Hex(word);
      if (h === targetHash.trim().toLowerCase()) {
        setReverseResult(`Found ✅ "${word}"`);
        return;
      }
    }
    setReverseResult("Not found ❌ (אין התאמה במילון)");
  };

  return (
    <main className="mx-auto max-w-4xl p-6 text-white space-y-6 text-center">
      <h1 className="text-3xl font-extrabold text-center">Hashing Lab</h1>

      {/* Intro */}
      <section className="rounded-xl border p-4  space-y-3">
        <h2 className="text-xl font-bold">מה זה Hash ולמה זה חשוב?</h2>
        <p>
          Hash הוא “טביעת אצבע” דיגיטלית לטקסט או קובץ. הוא מייצג את המידע – אך
          לא שומר אותו.
        </p>
        <p>
          Hash הוא <b>חד־כיווני</b>: אפשר לחשב אותו, אבל אי אפשר לשחזר ממנו את
          הטקסט המקורי.
        </p>
        <ul className="list-disc pr-6">
          <li>אחסון סיסמאות בצורה מאובטחת</li>
          <li>בדיקת שלמות קבצים</li>
          <li>Avalanche Effect – שינוי קטן משנה הכל</li>
        </ul>

        <div className="rounded-lg bg-gray-100 border p-3 text-black">
          <b>איך “מגלים קודים” באמת?</b>
          לא מפענחים Hash. רק בודקים התאמה (Verify), או משווים למילון ידוע מראש.
        </div>

        <p className="text-sm opacity-80">{msg}</p>
      </section>

      {/* Hash */}
      <section className="rounded-xl border p-4  space-y-3">
        <h2 className="text-xl font-bold">1) SHA-256 – Hash Text</h2>
        <p>מחשבים Hash קבוע (64 תווים hex) מכל טקסט.</p>

        <textarea
          className="w-full border rounded-md p-2"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="כתוב טקסט..."
        />

        <button
          onClick={hashText}
          className="px-4 py-2 bg-black text-white rounded-md"
        >
          Hash
        </button>

        <p className="font-mono text-sm break-all">{textHash}</p>

        <div className="rounded-lg bg-gray-100 border p-3 text-sm text-black">
          נסה “hello” ואז “hello!” – ותראה שינוי מוחלט.
        </div>
      </section>

      {/* Verify */}
      <section className="rounded-xl border p-4  space-y-3">
        <h2 className="text-xl font-bold">2) Verify – טקסט + Hash</h2>
        <p>כך עובדים Login בעולם האמיתי: מחשבים Hash מחדש ומשווים.</p>

        <input
          className="w-full border rounded-md p-2"
          value={verifyText}
          onChange={(e) => setVerifyText(e.target.value)}
          placeholder="טקסט לבדיקה..."
        />

        <input
          className="w-full border rounded-md p-2"
          value={verifyHash}
          onChange={(e) => setVerifyHash(e.target.value)}
          placeholder="Hash להשוואה..."
        />

        <button
          onClick={verify}
          className="px-4 py-2 bg-black text-white rounded-md"
        >
          Verify
        </button>

        <p className="font-bold">{verifyResult}</p>
      </section>

      {/* Reverse demo */}
      <section className="rounded-xl border p-4  space-y-3">
        <h2 className="text-xl font-bold">3) Reverse Demo (לימודי)</h2>

        <p>זה לא פענוח – אלא חיפוש התאמה במילון קטן.</p>

        <input
          className="w-full border rounded-md p-2"
          value={targetHash}
          onChange={(e) => setTargetHash(e.target.value)}
          placeholder="Hash יעד..."
        />

        <textarea
          className="w-full border rounded-md p-2"
          rows={6}
          value={dictionary}
          onChange={(e) => setDictionary(e.target.value)}
        />

        <button
          onClick={reverseDemo}
          className="px-4 py-2 bg-black text-white rounded-md"
        >
          Search
        </button>

        <p className="font-bold">{reverseResult}</p>

        <p className="text-sm opacity-80">
          דוגמה: צור Hash ל-“cat”, העתק לכאן – וראה התאמה.
        </p>
      </section>
    </main>
  );
}
