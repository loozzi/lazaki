from typing import TYPE_CHECKING

from sqlalchemy import Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.models.Base import Base

if TYPE_CHECKING:
    from .Category import Category
    from .ProductImage import ProductImage
    from .ProductProperty import ProductProperty
    from .Variation import Variation


class Product(Base):
    __tablename__ = "product"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, nullable=False, autoincrement=True
    )
    name: Mapped[str] = mapped_column(String(1024), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    properties: Mapped[list["ProductProperty"]] = relationship(
        "ProductProperty", backref="products", uselist=True
    )
    images: Mapped[list["ProductImage"]] = relationship(
        "ProductImage", backref="products", uselist=True
    )
    categories: Mapped[list["Category"]] = relationship(
        "Category", secondary="category_product", backref="products", uselist=True
    )
    variations: Mapped[list["Variation"]] = relationship(
        "Variation", backref="products", uselist=True
    )


    def getInfomation(self):
        pass

    
    def update(self, name: str, description: str, properties: list["ProductProperty"],
               variations: list["Variation"], images: list["ProductImage"], categories: list["Category"]):
        pass

    def remove(self):
        pass
