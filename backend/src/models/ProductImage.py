from sqlalchemy import Boolean, Column, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column

from .Image import Image


class ProductImage(Image):
    __tablename__ = "product_image"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, nullable=False, autoincrement=True
    )
    productId = Column(Integer, ForeignKey("product.id"), nullable=False)
    isPrimary: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
