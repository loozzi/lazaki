from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column

from .Base import Base


class OrderDetail(Base):
    __tablename__ = "order_detail"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, nullable=False, autoincrement=True
    )
    orderId: Mapped[int] = mapped_column(ForeignKey("order.id"), nullable=False)
    productId: Mapped[int] = mapped_column(ForeignKey("product.id"), nullable=False)
    variationId: Mapped[int] = mapped_column(ForeignKey("variation.id"), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    price: Mapped[int] = mapped_column(Integer, nullable=False)
    oldPrice: Mapped[int] = mapped_column(Integer, nullable=False)


    def getProductDetail(self):
        pass

    
    def setQuantity(self, quantity):
        pass
