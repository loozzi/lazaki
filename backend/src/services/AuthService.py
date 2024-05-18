import google.oauth2.id_token
from google.auth.transport import requests
from src import bcrypt
from src.models import Admin

firebase_request_adapter = requests.Request()


class AuthService:
    # Xác thực token
    def verify(token: str):
        try:
            claims = google.oauth2.id_token.verify_firebase_token(
                token, firebase_request_adapter
            )
            if not claims:
                return None
            return claims
        except Exception as e:
            print(e)
            return None

    # Xác thực admin
    def verifyAdmin(username: str, password: str):
        admin = Admin.query.filter_by(username=username).first()
        if not admin:
            return None

        if not bcrypt.check_password_hash(admin.passwordHash, password):
            return None

        return admin
