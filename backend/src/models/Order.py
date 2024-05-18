import datetime
from typing import TYPE_CHECKING

from sqlalchemy import TIMESTAMP, Enum, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.utils.enums import OrderStatusEnum, PaymentMethodEnum, PaymentStatusEnum
from .Base import Base
from .Customer import Customer

if TYPE_CHECKING:
    from .Address import Address
    from .Customer import Customer
    from .OrderDetail import OrderDetail


class Order(Base):
    __tablename__ = "orders"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, nullable=False, autoincrement=True
    )
    customerId: Mapped[int] = mapped_column(ForeignKey("customer.id"), nullable=False)
    customer: Mapped["Customer"] = relationship("Customer", backref="orders")
    fullName: Mapped[str] = mapped_column(String(256), nullable=False, default="")
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
        Enum(OrderStatusEnum), nullable=False, default=OrderStatusEnum.ORDER
    )
    shippingName: Mapped[str] = mapped_column(String(256), nullable=False, default="")
    shippingCode: Mapped[str] = mapped_column(String(256), nullable=False, default="")
    orderDetails: Mapped[list["OrderDetail"]] = relationship(
        "OrderDetail", backref="orders", uselist=True
    )
    totalAmount: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    orderDate: Mapped[datetime.datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        default=func.current_timestamp(),
    )

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

    def getStatus(self):
        return self.status

    def getCart(self):
        customer = Customer.query.filter_by(id=self.customerId).first()
        return {
            "id": self.id,
            "customerId": self.customerId,
            "fullName": self.fullName,
            "email": customer.email,
            "paymentMethod": self.paymentMethod.value,
            "paymentStatus": self.paymentStatus.value,
            "note": self.note,
            "status": self.status.value,
            "shippingName": self.shippingName,
            "shippingCode": self.shippingCode,
            "orderDetails": [
                orderDetail.serialize() for orderDetail in self.orderDetails
            ],
            "totalAmount": self.totalAmount,
        }

    def getHistory(self):
        return {
            "id": self.id,
            "customerId": self.customerId,
            "fullName": self.fullName,
            "paymentMethod": self.paymentMethod.value,
            "paymentStatus": self.paymentStatus.value,
            "orderDetails": [
                orderDetail.serialize() for orderDetail in self.orderDetails
            ],
            "totalAmount": self.totalAmount,
            "orderDate": self.orderDate.strftime("%Y-%m-%d %H:%M:%S"),
        }
