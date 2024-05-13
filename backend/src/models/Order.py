from typing import TYPE_CHECKING

from sqlalchemy import Enum, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.utils.enums import OrderStatusEnum, PaymentMethodEnum, PaymentStatusEnum

from .Base import Base

if TYPE_CHECKING:
    from .Address import Address
    from .Customer import Customer
    from .OrderDetail import OrderDetail


class Order(Base):
    __tablename__ = "order"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, nullable=False, autoincrement=True
    )
    customerId: Mapped[int] = mapped_column(ForeignKey("customer.id"), nullable=False)
    customer: Mapped["Customer"] = relationship("Customer", backref="orders")
    fullName: Mapped[str] = mapped_column(String(256), nullable=False)
    addressId: Mapped[int] = mapped_column(ForeignKey("address.id"), nullable=False)
    address: Mapped["Address"] = relationship("Address", backref="orders")
    paymentMethod: Mapped[str] = mapped_column(
        Enum(PaymentMethodEnum), nullable=False, default=PaymentMethodEnum.COD
    )
    paymentStatus: Mapped[str] = mapped_column(
        Enum(PaymentStatusEnum), nullable=False, default=PaymentStatusEnum.UNPAID
    )
    note: Mapped[str] = mapped_column(String(256), nullable=True)
    status: Mapped[str] = mapped_column(
        Enum(PaymentStatusEnum), nullable=False, default=OrderStatusEnum.ORDER
    )
    shippingName: Mapped[str] = mapped_column(String(256), nullable=False)
    shippingCode: Mapped[str] = mapped_column(String(256), nullable=False)
    orderDetails: Mapped[list["OrderDetail"]] = relationship(
        "OrderDetail", backref="order", uselist=True
    )
    totalAmount: Mapped[int] = mapped_column(Integer, nullable=False)

    def setListOrderDetail(self, orderDetails):
        pass

    def setCustomerId(self, customerId):
        self.customerId = customerId

    def setTotalAmount(self, totalAmount):
        self.totalAmount = totalAmount

    def setAddress(self, phoneNumber, province, district, ward, street):
        pass

    def setConfirm(self, confirm):
        pass

    def showDetail(self):
        pass

    def cancelOrder(self):
        pass

    def getOrderDetail(self, variationId):
        pass

    def removeOrderDetail(self, variationId):
        pass
