from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column

from .Image import Image


class RatingImage(Image):
    __tablename__ = "rating_image"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, nullable=False, autoincrement=True
    )
    rating_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("rating.id"), nullable=False
    )
