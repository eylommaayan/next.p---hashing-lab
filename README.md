
<img width="1209" height="887" alt="image" src="https://github.com/user-attachments/assets/b914357b-f391-4329-8cfe-68daece53388" />


<img width="1135" height="906" alt="image" src="https://github.com/user-attachments/assets/0d50af10-e120-4478-abe0-8ff80e05b765" />




.

---

# 🔐 Hashing Lab – Next.js + MongoDB

מעבדת לימוד מעשית המדגימה עקרונות מרכזיים בעולם ה־**Hashing ואבטחת מידע**, באמצעות אפליקציית Web מודרנית שנבנתה עם **Next.js** ו־**MongoDB**.

הפרויקט נועד להמחיש בצורה ויזואלית וברורה כיצד Hashing משמש בעולם האמיתי לאחסון סיסמאות, בדיקת שלמות קבצים ואימות מידע – הן מנקודת מבט הגנתית (Blue Team) והן כהכנה להבנה התקפית (PT).

---

## 🎯 מטרות הפרויקט

* להבין מהו Hashing וכיצד הוא שונה מהצפנה (Encryption)
* להדגים אחסון סיסמאות מאובטח באמצעות bcrypt
* להמחיש שימוש ב־SHA-256 ל־Hashing של טקסטים
* להדגים בדיקת **שלמות קבצים (File Integrity)**
* לחבר בין תיאוריה קריפטוגרפית ליישום מעשי בקוד

---

## 🧪 מה כולל ה־Lab?

### 1️⃣ Password Hashing (bcrypt)

* רישום משתמש עם email וסיסמה
* שמירת הסיסמה במסד הנתונים כ־Hash בלבד (bcrypt + salt)
* התחברות משתמש באמצעות השוואת Hash
* אין שמירה או הצגה של סיסמאות גלויות

📌 מדגים עקרונות של:

* Secure Password Storage
* Salting
* Password Verification

---

### 2️⃣ SHA-256 – Hashing טקסט

* קלט טקסט חופשי מהמשתמש
* חישוב Hash מסוג SHA-256
* הצגת ה־Hash המתקבל

📌 מדגים:

* Hash חד־כיווני
* Avalanche Effect (שינוי קטן → Hash שונה לגמרי)
* שימוש ב־Web Crypto API

---

### 3️⃣ File Integrity (SHA-256)

* העלאת קובץ מהמערכת
* חישוב SHA-256 לקובץ
* שימוש ב־Hash כדי לוודא שלמות קובץ

📌 מדגים:

* בדיקת שלמות קבצים
* זיהוי שינוי או פגיעה בקובץ
* שימוש נפוץ בהורדת ISO / עדכונים / קבצים רגישים

---

## 🛠 טכנולוגיות

* **Next.js (App Router)**
* **TypeScript**
* **MongoDB + Mongoose**
* **bcrypt**
* **Web Crypto API**
* **pnpm**

---

## 📂 מבנה עיקרי

```bash
src/
 ├─ app/
 │   ├─ api/
 │   │   ├─ auth/        # register / login
 │   │   ├─ hash/sha256  # hashing טקסט
 │   │   └─ file/sha256  # hashing קבצים
 │   └─ page.tsx         # UI ראשי
 ├─ lib/
 │   └─ db.ts            # חיבור MongoDB
 └─ model/
     └─ User.js          # סכמת משתמש
```

---

## 🚀 הרצה מקומית

```bash
pnpm install
pnpm dev
```

יש להגדיר משתנה סביבה:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/hashing_lab
```

---

## 🔐 דגשים אבטחתיים

* סיסמאות **לעולם אינן נשמרות כטקסט גלוי**
* Hashing מבוצע בצד השרת
* שימוש ב־Salt אוטומטי (bcrypt)
* הפרויקט מיועד ללימוד – לא למערכת Production

---

## 📚 קהל יעד

* סטודנטים לסייבר
* SOC / Blue Team
* Penetration Testing (הבנת חולשות Hashing)
* מפתחי Web שרוצים להבין אבטחת סיסמאות

---

## 🧠 הרחבות עתידיות (רעיונות)

* JWT Authentication
* Pepper לסיסמאות
* Rate Limiting
* Comparison בין אלגוריתמים (MD5 / SHA1 / bcrypt)
* Rainbow Table Demo (לימודי בלבד)
---
Vercel

רק תגיד 🚀
