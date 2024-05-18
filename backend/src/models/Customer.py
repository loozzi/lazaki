import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.models.Base import Base
from src.utils.enums import CustomerStatusEnum, GenderEnum

from .Address import Address


class Customer(Base):
    __tablename__ = "customer"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, nullable=False, autoincrement=True
    )
    uid: Mapped[str] = mapped_column(String(256), nullable=False, unique=True)
    email: Mapped[str] = mapped_column(String(256), nullable=False)
    status: Mapped[str] = mapped_column(
        Enum(CustomerStatusEnum), nullable=False, default=CustomerStatusEnum.ACTIVE
    )
    fullName: Mapped[str] = mapped_column(String(256), nullable=True)
    birthday: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=True)
    gender: Mapped[str] = mapped_column(Enum(GenderEnum), nullable=True)
    addressId: Mapped[int] = mapped_column(ForeignKey("address.id"), nullable=True)
    address: Mapped["Address"] = relationship("Address", backref="customer")

    def setStatus(self, status: CustomerStatusEnum):
        self.status = status

    def setAddress(self, address: Address):
        pass

    def serialize(self):
        return {
            "id": self.id,
            "fullName": self.fullName,
            "email": self.email,
            "status": self.status.value if self.status else None,
            "birthday": self.birthday.strftime("%Y-%m-%d") if self.birthday else None,
            "gender": self.gender.value if self.gender else None,
        }
