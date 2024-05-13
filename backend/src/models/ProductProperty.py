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
        pass


    def setName(self):
        return self.name
    
    
    def setValue(self):
        return self.value
