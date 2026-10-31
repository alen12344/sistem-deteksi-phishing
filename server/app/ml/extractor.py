import re
import math
from urllib.parse import urlparse
from typing import Dict, Any, List

SUSPICIOUS_TLDS = {
    "xyz", "top", "tk", "ml", "ga", "cf", "gq", "buzz", "fit", "icu", "click", "rest", "cam", "loan", "work"
}

SUSPICIOUS_KEYWORDS = [
    "login", "verify", "update", "secure", "banking", "account", "wallet",
    "signin", "confirm", "security", "paypal", "appleid", "support", "billing",
    "password", "auth", "token", "recovery", "alert", "service"
]

def shannon_entropy(data: str) -> float:
    """Calculate the Shannon entropy of a string."""
    if not data:
        return 0.0
    entropy = 0.0
    for x in set(data):
        p_x = float(data.count(x)) / len(data)
        if p_x > 0:
            entropy += - p_x * math.log2(p_x)
    return round(entropy, 4)

def is_ip_address(netloc: str) -> bool:
    """Check if netloc/domain is an IP address."""
    clean_host = netloc.split(":")[0]
    pattern = r"^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$"
    return bool(re.match(pattern, clean_host))

def has_cyrillic_or_homograph(text: str) -> bool:
    """Detect presence of Cyrillic or non-ASCII characters often used in homograph phishing."""
    for char in text:
        code = ord(char)
        # Cyrillic block is 0x0400 to 0x04FF
        if 0x0400 <= code <= 0x04FF or code > 127:
            return True
    return False

def extract_features(url: str) -> Dict[str, Any]:
    """
    Extracts structural, lexical, and security features from a URL.
    Returns:
        dict with:
        - raw_features: numerical values suitable for ML model
        - indicators: human-readable security risk flags
        - summary: clean metadata
    """
    url_cleaned = url.strip()
    if not (url_cleaned.startswith("http://") or url_cleaned.startswith("https://")):
        url_with_scheme = "http://" + url_cleaned
    else:
        url_with_scheme = url_cleaned

    parsed = urlparse(url_with_scheme)
    hostname = parsed.hostname or parsed.netloc or ""
    path = parsed.path or ""
    query = parsed.query or ""

    # Feature 1: URL Length
    url_length = len(url_cleaned)
    # Feature 2: Hostname Length
    hostname_length = len(hostname)
    # Feature 3: Has HTTPS
    has_https = 1 if parsed.scheme == "https" else 0
    # Feature 4: Contains '@' (Userinfo attack)
    has_at_symbol = 1 if "@" in url_cleaned else 0
    # Feature 5: Has IP address as host
    has_ip = 1 if is_ip_address(hostname) else 0
    # Feature 6: Dot count in hostname
    dot_count = hostname.count(".")
    # Feature 7: Hyphen count in hostname
    hyphen_count = hostname.count("-")
    # Feature 8: Suspicious keywords count in path/query/hostname
    lower_url = url_cleaned.lower()
    keywords_found = [kw for kw in SUSPICIOUS_KEYWORDS if kw in lower_url]
    keyword_count = len(keywords_found)
    # Feature 9: Suspicious TLD
    tld = hostname.split(".")[-1].lower() if "." in hostname else ""
    has_suspicious_tld = 1 if tld in SUSPICIOUS_TLDS else 0
    # Feature 10: Subdomain depth
    subdomain_count = max(0, len(hostname.split(".")) - 2)
    # Feature 11: Hostname Shannon Entropy
    hostname_entropy = shannon_entropy(hostname)
    # Feature 12: Cyrillic / Homograph attack
    has_homograph = 1 if has_cyrillic_or_homograph(hostname) else 0
    # Feature 13: Slashes count in path
    slash_count = path.count("/")
    # Feature 14: Double slash in path redirect trick
    has_double_slash_redirect = 1 if "//" in path else 0

    # Risk Indicators breakdown for UI display
    indicators: List[Dict[str, Any]] = []

    if has_homograph:
        indicators.append({
            "title": "Karakter Homograph / Non-ASCII Terdeteksi",
            "description": "Domain mengandung karakter non-Latin (seperti Cyrillic) yang sering dipakai meniru domain resmi (IDN Homograph Attack).",
            "severity": "CRITICAL"
        })

    if has_ip:
        indicators.append({
            "title": "Alamat IP Digunakan Langsung",
            "description": f"URL menggunakan alamat IP ({hostname}) alih-alih nama domain terdaftar, tipikal server phishing sementara.",
            "severity": "HIGH"
        })

    if has_at_symbol:
        indicators.append({
            "title": "Karakter '@' Mencurigakan",
            "description": "Simbol '@' dalam URL menginstruksikan browser mengabaikan teks sebelumnya sebagai username, teknik umum penipuan URL.",
            "severity": "HIGH"
        })

    if not has_https:
        indicators.append({
            "title": "Koneksi Tidak Terenkripsi (Tanpa HTTPS)",
            "description": "Situs menggunakan protokol HTTP biasa tanpa sertifikat SSL/TLS, rentan intersepsi data.",
            "severity": "MEDIUM"
        })
    else:
        indicators.append({
            "title": "Enkripsi HTTPS Aktif",
            "description": "Situs menggunakan protokol HTTPS berenkripsi standar.",
            "severity": "SAFE"
        })

    if has_suspicious_tld:
        indicators.append({
            "title": f"Ekstensi Domain Berisiko Tinggi (.{tld})",
            "description": f"Top Level Domain '.{tld}' memiliki reputasi tinggi terhadap aktivitas spam dan phishing berbiaya murah.",
            "severity": "HIGH"
        })

    if keyword_count > 0:
        indicators.append({
            "title": f"Kata Kunci Kredensial Terdeteksi ({', '.join(keywords_found[:3])})",
            "description": "Ditemukan istilah sensitif seperti autentikasi, akun, atau transaksi yang sering ditargetkan penyerang.",
            "severity": "MEDIUM" if keyword_count == 1 else "HIGH"
        })

    if subdomain_count >= 3:
        indicators.append({
            "title": f"Struktur Subdomain Berlapis ({subdomain_count} Subdomain)",
            "description": "Hierarki subdomain yang terlalu dalam sering dipakai untuk mengelabui pembaca nama domain utama.",
            "severity": "MEDIUM"
        })

    if hostname_entropy > 3.8:
        indicators.append({
            "title": f"Entropi Domain Tinggi ({hostname_entropy})",
            "description": "Tingkat keacakan karakter domain sangat tinggi, terindikasi algoritma DGA (Domain Generation Algorithm).",
            "severity": "MEDIUM"
        })

    if url_length > 75:
        indicators.append({
            "title": f"Panjang URL Tidak Wajar ({url_length} Karakter)",
            "description": "Panjang URL melebihi batas rata-rata domain normal untuk menyembunyikan parameter berbahaya.",
            "severity": "LOW"
        })

    # Vector for ML Model (12 features)
    feature_vector = [
        url_length,
        hostname_length,
        has_https,
        has_at_symbol,
        has_ip,
        dot_count,
        hyphen_count,
        keyword_count,
        has_suspicious_tld,
        subdomain_count,
        hostname_entropy,
        has_homograph
    ]

    return {
        "url": url_cleaned,
        "hostname": hostname,
        "vector": feature_vector,
        "indicators": indicators,
        "stats": {
            "url_length": url_length,
            "has_https": bool(has_https),
            "has_at": bool(has_at_symbol),
            "is_ip": bool(has_ip),
            "suspicious_tld": bool(has_suspicious_tld),
            "subdomain_depth": subdomain_count,
            "entropy": hostname_entropy,
            "keywords": keywords_found,
            "has_homograph": bool(has_homograph)
        }
    }
