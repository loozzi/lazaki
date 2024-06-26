from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column
from src.models.Base import Base


class Token(Base):
    __tablename__ = "token"
    uid: Mapped[str] = mapped_column(
        ForeignKey("customer.uid"),
        nullable=False,
        primary_key=True,
    )
    token: Mapped[str] = mapped_column(String(2048), nullable=False)

    def setToken(self, token: str):
        self.token = token
