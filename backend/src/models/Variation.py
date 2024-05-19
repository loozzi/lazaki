from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from src.models.Base import Base
from src.models.Product import Product


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

    def getVariation(self):
        data = {
            "id": self.id,
            "type": self.type,
            "name": self.name,
            "option": self.option,
            "image": self.image,
            "price": self.price,
            "oldPrice": self.oldPrice,
            "quantity": self.quantity,
            "sold": self.sold,
        }
        return data

    def setType(self, type):
        self.type = type

    def setName(self, name):
        self.name = name

    def setOption(self, option):
        self.option = option

    def setSold(self, soldNumber):
        self.sold = soldNumber

    def setImage(self, image: str):
        self.image = image

    def setQuantity(self, quantity):
        self.quantity = quantity

    def setOldPrice(self, oldPrice):
        self.oldPrice = oldPrice

    def setPrice(self, price):
        self.price = price

    def serialize(self):
        return {
            "id": self.id,
            "type": self.type,
            "name": self.name,
            "option": self.option,
            "image": self.image,
            "price": self.price,
            "oldPrice": self.oldPrice,
            "quantity": self.quantity,
            "sold": self.sold,
        }

    def getInfo(self):
        return {
            "type": self.type,
            "name": self.name,
            "option": self.option,
        }

    def getProduct(self):
        return Product.query.get(self.productId)
