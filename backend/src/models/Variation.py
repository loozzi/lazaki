from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from src.models.Base import Base


class Variation(Base):
    __tablename__ = "variation"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, nullable=False, autoincrement=True
    )
    productId: Mapped[int] = mapped_column(
        Integer, ForeignKey("product.id"), nullable=False
    )
    type: Mapped[str] = mapped_column(String(255), nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    option: Mapped[str] = mapped_column(String(1024), nullable=False)
    image: Mapped[str] = mapped_column(String(1024), nullable=True, default="")
    price: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    oldPrice: Mapped[int] = mapped_column(Integer, nullable=True, default=0)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    sold: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
