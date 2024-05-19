from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.models.OrderDetail import OrderDetail
from src.models.Base import Base
from src.models.Order import Order
from src import db

if TYPE_CHECKING:
    from .RatingImage import RatingImage
    from src.models.Variation import Variation


class Rating(Base):
    __tablename__ = "rating"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, nullable=False, autoincrement=True
    )
    customerId: Mapped[int] = mapped_column(
        Integer, ForeignKey("customer.id"), nullable=False
    )
    orderDetailId: Mapped[int] = mapped_column(
        Integer, ForeignKey("order_detail.id"), nullable=True
    )
    variationId: Mapped[int] = mapped_column(
        Integer, ForeignKey("variation.id"), nullable=True
    )
    productId: Mapped[int] = mapped_column(
        Integer, ForeignKey("product.id"), nullable=True
    )
    value: Mapped[int] = mapped_column(Integer, nullable=False)
    content: Mapped[str] = mapped_column(String(1024), nullable=True)
    images: Mapped[list["RatingImage"]] = relationship(
        "RatingImage", backref="ratings", uselist=True
    )

    def serialize(self):
        order = (
            Order.query.join(OrderDetail)
            .filter(
                OrderDetail.id == self.orderDetailId,
                Order.customerId == self.customerId,
            )
            .first()
        )
        variation = Variation.query.filter_by(id=self.variationId).first()
        return {
            "id": self.id,
            "value": self.value,
            "fullName": order.fullName,
            "productId": self.productId,
            "variationId": self.variationId,
            "variation": variation.getInfo(),
            "content": self.content,
            "images": [image.serialize() for image in self.images],
            "createdAt": self.createdAt,
        }
