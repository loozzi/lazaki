from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from . import Base


class Admin(Base):
    __tablename__ = "admin"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, nullable=False, autoincrement=True
    )
    email: Mapped[str] = mapped_column(String(256), nullable=True, unique=True)
    passwordHash: Mapped[str] = mapped_column(String(512), nullable=False)
    username: Mapped[str] = mapped_column(String(256), nullable=False, unique=True)
