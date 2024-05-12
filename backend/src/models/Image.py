from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from src.models.Base import Base


class Image(Base):
    __abstract__ = True
    link: Mapped[str] = mapped_column(String(1024), nullable=False)


    def getLink(self) -> str:
        return self.link
