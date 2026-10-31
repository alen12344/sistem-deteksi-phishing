# 🛡️ Phishing Detector System (Cybersecurity AI)

Sistem pendeteksi ancaman tautan penipuan (Phishing URL Detection System) mutakhir dengan integrasi antarmuka web modern (Next.js), arsitektur microservice analitik AI berbasis Python (FastAPI), ekstraksi fitur keamanan siber (lexical, structural, homograph attacks, entropy analysis), serta klasifikasi Machine Learning real-time.

---

## 📁 Struktur Direktori

```text
phishing-detector-system/
├── client/                     # Frontend Next.js (App Router, Tailwind CSS, Lucide Icons)
│   ├── src/
│   │   ├── app/                
│   │   │   ├── (auth)/         # Halaman Login & Register
│   │   │   ├── dashboard/      # Dashboard analitik riwayat pemindaian & metrik
│   │   │   ├── scan/           # Halaman utama pemindai URL interaktif
│   │   │   ├── layout.tsx      # Root layout & tema dark cybersecurity
│   │   │   └── page.tsx        # Landing page bernuansa cyber-security
│   │   ├── components/         
│   │   │   ├── ui/             # Komponen modular (Button, Input, Card, Badge)
│   │   │   ├── charts/         # Donut chart & grafik analitik ancaman
│   │   │   └── scanner/        # Search bar, animasi radar scan, & kartu hasil
│   │   ├── lib/                
│   │   │   ├── api.ts          # API Client penghubung ke backend FastAPI
│   │   │   └── supabase.ts     # Konfigurasi Supabase Auth & DB
│   │   └── styles/             
│   │       └── globals.css     # Dark mode tokens & pulsing crimson animations
│   ├── tailwind.config.ts
│   └── package.json
├── server/                     # Backend API Python (FastAPI + Machine Learning)
│   ├── app/
│   │   ├── api/
│   │   │   └── routes.py       # Endpoint POST /api/scan, GET /api/stats, GET /api/history
│   │   ├── core/
│   │   │   └── config.py       # Konfigurasi aplikasi & CORS
│   │   ├── ml/
│   │   │   ├── extractor.py    # Ekstraktor fitur (panjang URL, homograph, @, TLD, entropi)
│   │   │   ├── model.pkl       # Trained ML Classifier model
│   │   │   └── predict.py      # Pipeline inferensi model & fallback heuristic
│   │   └── main.py             # Entry point FastAPI server
│   ├── train_model.py          # Script pelatihan dataset model machine learning
│   ├── requirements.txt
│   └── Dockerfile
└── README.md
```

---

## 🎨 Konsep Desain & Estetika UI/UX

- **Palet Warna Dark Mode**: 
  - Background: `#0B0F19` & `#0F172A` (Mengurangi kelelahan mata, nuansa terminal pertahanan siber).
  - Aksen Aman: Neon Green (`#10B981`) menandakan website terverifikasi aman.
  - Aksen Bahaya: Crimson Red (`#EF4444`) beranimasi denyut (*pulsing*) ketika ancaman phishing terdeteksi.
- **Tipografi**: Inter / Sans-serif modern berpresisi tinggi untuk tabel dan metrik keamanan.
- **Efek Interaktif**: Radar sweep saat proses analisis, confidence score meter, dan rincian indikator ancaman secara transparan.

---

## 🚀 Panduan Menjalankan Sistem

### 1. Menjalankan Backend (FastAPI + Python ML)

Pastikan Python 3.10+ telah terinstal.

```bash
cd server

# Install dependensi
pip install -r requirements.txt

# (Opsional) Latih dan buat file model.pkl
python train_model.py

# Jalankan server API
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

> **Dokumentasi Swagger API**: Buka `http://127.0.0.1:8000/docs` di browser.

### 2. Menjalankan Frontend (Next.js)

Pastikan Node.js 18+ telah terinstal.

```bash
cd client

# Install dependensi
npm install

# Jalankan server pengembangan
npm run dev
```

> Akses antarmuka di `http://localhost:3000`.

---

## 🧪 Pengujian Sampel URL

Coba masukkan tautan berikut di halaman pemindai `/scan`:

1. **Website Aman**:
   - `https://google.com`
   - `https://github.com/security`
   - `https://wikipedia.org`
2. **Indikasi Phishing / Mencurigakan**:
   - `http://paypal-security-update-center.xyz/login?ref=auth` (Suspicious TLD + HTTP + Sensitive keywords)
   - `http://192.168.1.105/bank-verification/login.php` (Raw IP Address + No SSL)
   - `http://user:pass@chase-banking-security-alert.ml/auth` (@ symbol obfuscation + Free suspicious TLD)
