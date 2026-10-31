import os
import joblib
import numpy as np
from typing import Dict, Any
from app.ml.extractor import extract_features
from app.core.config import settings

_model = None

def load_model():
    global _model
    if _model is None and os.path.exists(settings.MODEL_PATH):
        try:
            _model = joblib.load(settings.MODEL_PATH)
        except Exception as e:
            print(f"[WARN] Failed to load model from {settings.MODEL_PATH}: {e}")
            _model = None
    return _model

def heuristic_predict(features_data: Dict[str, Any]) -> Dict[str, Any]:
    """Rule-based weighted heuristic scoring system for URL phishing analysis."""
    stats = features_data["stats"]
    indicators = features_data["indicators"]
    
    score = 0.0
    
    # Critical flags
    if stats["has_homograph"]:
        score += 0.45
    if stats["is_ip"]:
        score += 0.35
    if stats["has_at"]:
        score += 0.35
    if stats["suspicious_tld"]:
        score += 0.30
    if not stats["has_https"]:
        score += 0.20
    if stats["subdomain_depth"] >= 2:
        score += min(0.25, 0.10 * stats["subdomain_depth"])
    if len(stats["keywords"]) > 0:
        score += min(0.35, 0.15 * len(stats["keywords"]))
    if stats["entropy"] > 3.8:
        score += 0.15
    if stats["url_length"] > 75:
        score += 0.10

    # Normalization
    confidence_raw = min(1.0, score)
    
    # Safe domain adjustment: standard HTTPS with no red flags
    if stats["has_https"] and not stats["is_ip"] and not stats["has_homograph"] and len(stats["keywords"]) == 0 and not stats["suspicious_tld"]:
        confidence_raw = max(0.05, confidence_raw * 0.2)
        
    is_phishing = confidence_raw >= 0.48
    
    if is_phishing:
        confidence = round(max(0.65, confidence_raw), 4)
        risk_level = "CRITICAL" if confidence >= 0.85 else "HIGH" if confidence >= 0.65 else "SUSPICIOUS"
    else:
        confidence = round(max(0.82, 1.0 - confidence_raw), 4)
        risk_level = "SAFE"

    return {
        "is_phishing": is_phishing,
        "confidence": confidence,
        "confidence_percentage": round(confidence * 100, 1),
        "risk_level": risk_level,
        "model_used": "Heuristic Engine v1"
    }

def predict_url(url: str) -> Dict[str, Any]:
    """Main inference entrypoint: extracts features and applies ML model or heuristic engine."""
    extracted = extract_features(url)
    model = load_model()

    if model is not None:
        try:
            vector = np.array([extracted["vector"]])
            prediction = model.predict(vector)[0]
            probabilities = model.predict_proba(vector)[0]
            
            is_phishing = bool(prediction == 1)
            confidence = float(probabilities[1] if is_phishing else probabilities[0])
            confidence_percentage = round(confidence * 100, 1)

            if is_phishing:
                risk_level = "CRITICAL" if confidence >= 0.85 else "HIGH" if confidence >= 0.65 else "SUSPICIOUS"
            else:
                risk_level = "SAFE" if confidence >= 0.70 else "SUSPICIOUS"

            return {
                "url": extracted["url"],
                "hostname": extracted["hostname"],
                "is_phishing": is_phishing,
                "confidence": round(confidence, 4),
                "confidence_percentage": confidence_percentage,
                "risk_level": risk_level,
                "model_used": "RandomForest Phishing Classifier",
                "indicators": extracted["indicators"],
                "features": extracted["stats"]
            }
        except Exception as e:
            print(f"[WARN] ML inference failed, falling back to heuristic: {e}")

    # Fallback to heuristic
    heuristic_res = heuristic_predict(extracted)
    return {
        "url": extracted["url"],
        "hostname": extracted["hostname"],
        "is_phishing": heuristic_res["is_phishing"],
        "confidence": heuristic_res["confidence"],
        "confidence_percentage": heuristic_res["confidence_percentage"],
        "risk_level": heuristic_res["risk_level"],
        "model_used": heuristic_res["model_used"],
        "indicators": extracted["indicators"],
        "features": extracted["stats"]
    }
