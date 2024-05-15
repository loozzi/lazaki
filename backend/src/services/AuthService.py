import google.oauth2.id_token
from google.auth.transport import requests

firebase_request_adapter = requests.Request()


class AuthService:
    # Xác thực token
    def verify(token: str):
        claims = google.oauth2.id_token.verify_firebase_token(
            token, firebase_request_adapter
        )
        if not claims:
            return None
        return claims
