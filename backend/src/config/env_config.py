import os

from dotenv import load_dotenv

load_dotenv()


class EnvConfig:
    def __init__(self) -> None:
        self.SQLALCHEMY_DATABASE_URI = os.environ.get("SQLALCHEMY_DATABASE_URI")
