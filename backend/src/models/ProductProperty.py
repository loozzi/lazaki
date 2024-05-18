from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from src.models.Base import Base


class ProductProperty(Base):
    __tablename__ = "product_property"
    productId: Mapped[int] = mapped_column(
        Integer, ForeignKey("product.id"), primary_key=True
    )
    name: Mapped[str] = mapped_column(String(255), primary_key=True)
    value: Mapped[str] = mapped_column(String(1024), nullable=False)

    def getProperty(self):
        data = {
            "name": self.name,
            "value": self.value,
        }
        return data

    def setName(self, name):
        self.name = name

    def setValue(self, value):
        self.value = value

    def serialize(self):
        return {"name": self.name, "value": self.value}