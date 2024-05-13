from typing import TYPE_CHECKING

from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.models.Base import Base

if TYPE_CHECKING:
    from .Product import Product


class Category(Base):
    __tablename__ = "category"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, nullable=False, autoincrement=True
    )
    name: Mapped[str] = mapped_column(String(256), nullable=False)
    slug: Mapped[str] = mapped_column(String(256), nullable=False, unique=True)
    products: Mapped[list["Product"]] = relationship(
        "Product", secondary="category_product", backref="categorys", uselist=True
    )
    description: Mapped[str] = mapped_column(String(256), nullable=True)

    def getInfo(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "slug": self.slug,
            "description": self.description,
        }

    def edit(self, name: str, slug: str, description: str):
        self.name = name
        self.slug = slug
        self.description = description
