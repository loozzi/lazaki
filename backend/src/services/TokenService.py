from datetime import datetime, timedelta, timezone

import jwt
from src.config import envConfig
from src.models.Token import Token


class TokenService:
    # Kiểm tra token hợp lệ
    def verify(token):
        token = Token.query.filter_by(token=token).first()
        if not token:
            return None

        try:
            return jwt.decode(token.token, envConfig.SECRET_KEY, algorithms=["HS256"])
        except Exception as e:
            print(e)
            return None

    # Tạo token cho Admin
    def generate(data, type="user"):
        if type == "admin":
            payload = {"id": data.id}

            payload["iat"] = int(datetime.now(timezone.utc).timestamp())
            payload["exp"] = int(
                (datetime.now(timezone.utc) + timedelta(days=1)).timestamp()
            )
            accessToken = jwt.encode(
                payload,
                key=envConfig.SECRET_KEY,
                algorithm="HS256",
            )

            return accessToken
        else:
            payload = {
                "uid": data.uid,
            }

            payload["iat"] = int(datetime.now(timezone.utc).timestamp())
            payload["exp"] = int(
                (datetime.now(timezone.utc) + timedelta(days=1)).timestamp()
            )
            payload["isRefreshToken"] = False
            accessToken = jwt.encode(
                payload,
                key=envConfig.SECRET_KEY,
                algorithm="HS256",
            )

            payload["exp"] = int(
                (datetime.now(timezone.utc) + timedelta(days=30)).timestamp()
            )
            payload["isRefreshToken"] = True
            refreshToken = jwt.encode(
                payload,
                key=envConfig.SECRET_KEY,
                algorithm="HS256",
            )

            try:
                oldToken = Token.query.filter_by(uid=data.uid).first()
                oldToken.remove()
            except Exception as e:
                print(e)

            token = Token(
                uid=data.uid,
                token=refreshToken,
            )
            token.save()

            return accessToken, refreshToken
