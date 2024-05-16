from typing import TYPE_CHECKING

from sqlalchemy import Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.models.Base import Base
from src import db
from src.models.OrderDetail import OrderDetail
from src.models.Rating import Rating
from src.models.ProductImage import ProductImage

if TYPE_CHECKING:
    from .Category import Category
    from .ProductImage import ProductImage
    from .ProductProperty import ProductProperty
    from .Variation import Variation


class Product(Base):
    __tablename__ = "product"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, nullable=False, autoincrement=True
    )
    name: Mapped[str] = mapped_column(String(1024), nullable=False)
    slug: Mapped[str] = mapped_column(String(1024), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    properties: Mapped[list["ProductProperty"]] = relationship(
        "ProductProperty", backref="products", uselist=True
    )
    images: Mapped[list["ProductImage"]] = relationship(
        "ProductImage", backref="products", uselist=True
    )
    categories: Mapped[list["Category"]] = relationship(
        "Category", secondary="category_product", backref="products", uselist=True
    )
    variations: Mapped[list["Variation"]] = relationship(
        "Variation", backref="products", uselist=True
    )


    def getRateMean(self):
        order_detail_list = OrderDetail.query.filter_by(
                                productId=self.id).all()
        rate_list = []
        for order_detail in order_detail_list:
             rate = Rating.query.filter_by(
                        orderDetailId=order_detail.id).first()
             rate_list.append(rate)
        if len(rate_list) == 0:
            return 0
        sum = 0
        for i in rate_list:
            sum += i.value
        return sum/len(rate_list)



    def is_PrimaryImage(self, link):
        image = ProductImage.query.filter_by(link=link).first()
        if image is None:
            return False
        if image.isPrimary:
            return True
        return False


    def getPrimaryImage(self):
        link = ""
        for image in self.images:
            if image.isPrimary:
                link = image.link
                break
        return link


    def getInfomation(self):
        id = self.id
        name = self.name
        description = self.description
        property = [prop.getProperty() for prop in self.properties]
        categories = [category.getInfo() for category in self.categories]
        variations = [variation.getVariation() for variation in self.variations]
        variations = sorted(variations, key=lambda x: x["price"])
        images = []
        for i in variations:
                image = {
                     "link": i["image"],
                     "variationId": i["id"],
                     "isPrimary": self.is_PrimaryImage(i["image"]),
                }
                images.append(image)
        data_response = {
            "id": id,
            "name": name,
            "description": description,
            "properties": property,
            "categories": categories,
            "variations": variations,
            "images": images,
        }
        return data_response
        
    def update(
        self,
        name: str,
        description: str,
        properties: list["ProductProperty"],
        variations: list["Variation"],
        images: list["ProductImage"],
        categories: list["Category"],
    ):
        pass

    def remove(self):
        pass
