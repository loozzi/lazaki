from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column
from .Base import Base

if TYPE_CHECKING:
    from .Variation import Variation


class OrderDetail(Base):
    __tablename__ = "order_detail"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, nullable=False, autoincrement=True
    )
    orderId: Mapped[int] = mapped_column(ForeignKey("orders.id"), nullable=False)
    productId: Mapped[int] = mapped_column(ForeignKey("product.id"), nullable=False)
    variationId: Mapped[int] = mapped_column(ForeignKey("variation.id"), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    price: Mapped[int] = mapped_column(Integer, nullable=False)
    oldPrice: Mapped[int] = mapped_column(Integer, nullable=False)

    def getProductDetail(self):
        pass

    def setQuantity(self, quantity):
        pass

    def getPrice(self):
        return self.price

    def serialize(self):
        variation = Variation.query.filter_by(id=self.variationId).first()
        return {
            "id": self.id,
            "orderId": self.orderId,
            "productId": self.productId,
            "variationId": self.variationId,
            "name": variation.name,
            "image": variation.image,
            "variation": variation.getInfo(),
            "quantity": self.quantity,
            "price": self.price,
            "oldPrice": self.oldPrice,
        }
