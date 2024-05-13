from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from src.models.Base import Base


class Address(Base):
    __tablename__ = "address"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, nullable=False, autoincrement=True
    )
    phoneNumber: Mapped[str] = mapped_column(String(15), nullable=False)
    province: Mapped[str] = mapped_column(String(256), nullable=False)
    district: Mapped[str] = mapped_column(String(256), nullable=False)
    ward: Mapped[str] = mapped_column(String(256), nullable=False)
    street: Mapped[str] = mapped_column(String(256), nullable=False)

    def setPhoneNumber(self, phoneNumber: str):
        self.phoneNumber = phoneNumber

    def setProvince(self, province: str):
        self.province = province

    def setDistrict(self, district: str):
        self.district = district

    def setWard(self, ward: str):
        self.ward = ward

    def setStreet(self, street: str):
        self.street = street