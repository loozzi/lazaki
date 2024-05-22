from sqlalchemy import Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.models.Base import Base
from src.models.Category import Category
from src.models.ProductImage import ProductImage
from src.models.ProductProperty import ProductProperty
from src.models.Variation import Variation


class Product(Base):
    __tablename__ = "product"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, nullable=False, autoincrement=True
    )
    name: Mapped[str] = mapped_column(String(1024), nullable=False)
    slug: Mapped[str] = mapped_column(String(1024), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    properties: Mapped[list[ProductProperty]] = relationship(
        "ProductProperty", backref="products", uselist=True
    )
    images: Mapped[list[ProductImage]] = relationship(
        "ProductImage", backref="products", uselist=True
    )
    categories: Mapped[list[Category]] = relationship(
        "Category", secondary="category_product", backref="products", uselist=True
    )
    variations: Mapped[list[Variation]] = relationship(
        "Variation", backref="products", uselist=True
    )

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

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "slug": self.slug,
            "description": self.description,
            "properties": [property.serialize() for property in self.properties],
            "images": [image.serialize() for image in self.images],
            "categories": [category.serialize() for category in self.categories],
            "variations": [variation.serialize() for variation in self.variations],
        }

    def getInfo(self):
        return {
            "id": self.id,
            "name": self.name,
            "slug": self.slug,
            "image": self.getPrimaryImage(),
            "category": [category.getName() for category in self.categories],
        }
