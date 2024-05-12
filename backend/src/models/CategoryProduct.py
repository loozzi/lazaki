from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column
from src.models.Base import Base


class CategoryProduct(Base):
    __tablename__ = "category_product"
    categoryId: Mapped[int] = mapped_column(
        Integer, ForeignKey("category.id"), primary_key=True
    )
    productId: Mapped[int] = mapped_column(
        Integer, ForeignKey("product.id"), primary_key=True
    )
