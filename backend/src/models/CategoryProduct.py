from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column

if TYPE_CHECKING:
    from .Category import Category
    from .Product import Product


class CategoryProduct:
    __tablename__ = "category_product"
    categoryId: Mapped[int] = mapped_column(
        Integer, ForeignKey("category.id"), primary_key=True
    )
    productId: Mapped[int] = mapped_column(
        Integer, ForeignKey("product.id"), primary_key=True
    )

    product: Mapped["Product"] = mapped_column(ForeignKey("product.id"), nullable=True)
    category: Mapped["Category"] = mapped_column(
        ForeignKey("category.id"), nullable=True
    )
