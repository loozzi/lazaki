from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.models.Base import Base

if TYPE_CHECKING:
    from .RatingImage import RatingImage


class Rating(Base):
    __tablename__ = "rating"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, nullable=False, autoincrement=True
    )
    customerId: Mapped[int] = mapped_column(
        Integer, ForeignKey("customer.id"), nullable=False
    )
    productId: Mapped[int] = mapped_column(
        Integer, ForeignKey("product.id"), nullable=False
    )
    variationId: Mapped[int] = mapped_column(
        Integer, ForeignKey("variation.id"), nullable=True
    )
    value: Mapped[int] = mapped_column(Integer, nullable=False)
    content: Mapped[str] = mapped_column(String(1024), nullable=True)
    images: Mapped[list["RatingImage"]] = relationship(
        "RatingImage", backref="ratings", uselist=True
    )
