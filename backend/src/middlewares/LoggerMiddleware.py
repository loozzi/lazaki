import logging

from flask import request
from src.services.TokenService import TokenService

logging.basicConfig(filename="std.log", format="%(asctime)s %(message)s", filemode="a")

logger = logging.getLogger()

logger.setLevel(logging.INFO)


def logger_middeware():
    token = request.headers.get("Authorization")
    if not token:
        user = "guest"
    else:
        token = token.split(" ")[1]
        data = TokenService.verify(token)
        if not data:
            user = "guest"
        else:
            user = data["uid"]

    logger.info(
        msg=f"LOGGER|{request.method}|{request.url.replace(request.url_root, '')}|{user}"
    )
