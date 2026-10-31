import os
import joblib
import numpy as np
from app.ml.extractor import extract_features

# Sample dataset representing legitimate domains vs phishing patterns
DATASET = [
    # Legitimate URLs (Label: 0)
    ("https://www.google.com", 0),
    ("https://github.com/explore", 0),
    ("https://stackoverflow.com/questions", 0),
    ("https://en.wikipedia.org/wiki/Main_Page", 0),
    ("https://www.microsoft.com/en-us", 0),
    ("https://apple.com/iphone", 0),
    ("https://amazon.com/gp/bestsellers", 0),
    ("https://netflix.com/browse", 0),
    ("https://youtube.com/feed/trending", 0),
    ("https://linkedin.com/feed", 0),
    ("https://twitter.com/home", 0),
    ("https://news.ycombinator.com", 0),
    ("https://developer.mozilla.org/en-US/docs/Web", 0),
    ("https://medium.com/@tech-updates", 0),
    ("https://docs.python.org/3/tutorial", 0),
    ("https://gitlab.com/dashboard", 0),
    ("https://cloudflare.com/learning", 0),
    ("https://digitalocean.com/community", 0),
    ("https://reddit.com/r/programming", 0),
    ("https://cnn.com/world", 0),
    ("https://bbc.com/news", 0),
    ("https://openai.com/research", 0),
    ("https://huggingface.co/models", 0),
    ("https://kaggle.com/competitions", 0),
    ("https://slack.com/help", 0),

    # Phishing / Malicious URLs (Label: 1)
    ("http://paypal-security-update-center.xyz/login?ref=auth", 1),
    ("http://192.168.1.105/bank-verification/login.php", 1),
    ("http://secure-update-appleid.tk/verify/account", 1),
    ("http://login.microsoftonline.security-check.gq/signin", 1),
    ("http://user:pass@chase-banking-security-alert.ml/auth", 1),
    ("http://amazon-account-billing-suspend.top/restore?user=victim", 1),
    ("http://netflix-payment-declined.buzz/update-billing", 1),
    ("http://wallet-connect-airdrop-bonus.icu/metamask/seed", 1),
    ("http://g00gle-accounts-verification.xyz/password-reset", 1),
    ("http://facebook-security-checkpoint.cf/recover", 1),
    ("http://104.244.42.1/secure/login.html", 1),
    ("http://bankofamerica-urgent-action-required.fit/portal", 1),
    ("http://binance-kyc-validation-urgent.rest/claim", 1),
    ("http://instagram-copyright-infringement.top/appeals", 1),
    ("http://steampowered-giftcard-giveaway.tk/redeem", 1),
    ("http://wellsfargo-notice-online.xyz/signon", 1),
    ("http://dhl-package-delivery-failed.buzz/reschedule?tracking=983192", 1),
    ("http://support-service-desk-auth.ml/verify-ticket", 1),
    ("http://crypto-airdrop-eth2026.click/claim?wallet=0x192837", 1),
    ("http://secure-login-portal-office365.icu/token", 1),
    ("http://whatsapp-web-qr-connect.cf/sync", 1),
    ("http://discord-nitro-free-3months.top/accept", 1),
    ("http://apple-icloud-device-locked.xyz/findmy", 1),
    ("http://twitter-blue-verification-badge.rest/apply", 1),
    ("http://gov-tax-refund-direct-deposit.buzz/claim-funds", 1)
]

def train_and_save():
    print("Extracting features from dataset...")
    X = []
    y = []
    for url, label in DATASET:
        feat = extract_features(url)
        X.append(feat["vector"])
        y.append(label)

    X = np.array(X)
    y = np.array(y)

    print(f"Dataset prepared: {len(X)} samples, {X.shape[1]} features.")

    from sklearn.ensemble import RandomForestClassifier
    from sklearn.metrics import classification_report, accuracy_score

    clf = RandomForestClassifier(n_estimators=50, random_state=42)
    clf.fit(X, y)

    y_pred = clf.predict(X)
    acc = accuracy_score(y, y_pred)
    print(f"Training accuracy: {acc * 100:.2f}%")
    print(classification_report(y, y_pred, target_names=["Safe", "Phishing"]))

    output_path = os.path.join(os.path.dirname(__file__), "app", "ml", "model.pkl")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    joblib.dump(clf, output_path)
    print(f"Model saved to {output_path}")

if __name__ == "__main__":
    train_and_save()
