from typing import List

from src.utils.response import Response
from src.models import Category, ProductImage, ProductProperty, Variation
from src.models import Product
from src import db


class ProductService:
    # Lấy danh sách sản phẩm
    def getProducts():
        pass

    # Tìm kiếm sản phẩm
    def searchProducts(
        keyword: str, minPrice: int, maxPrice: int, categories: List[str]
    ):
        pass

    # Lấy chi tiết của sản phẩm
    def getDetailProduct(productId: int):
        product = Product.query.filter_by(id=productId).first()
        if not product:
            return None
        return product

    # Thêm sản phẩm vào database
    def addProduct(
        productName: str,
        description: str,
        slug: str,
        properties: List[object],
        categories: List[object],
        variations: List[object],
        images: List[object],
    ):
        product = Product(name=productName, slug=slug, description=description)

        db.session.add(product)
        db.session.flush()

        # Thêm properties
        for prop in properties:
            property_obj = ProductProperty(
                productId=product.id, name=prop["name"], value=prop["value"]
            )
            db.session.add(property_obj)

        # Thêm categories
        for cat in categories:
            category_obj = Category.query.get(cat["id"])
            if not category_obj:
                category_obj = Category(
                    id=cat["id"],
                    name=cat["name"],
                    slug=cat["slug"],
                    description=cat["description"],
                )
                db.session.add(category_obj)
            product.categories.append(category_obj)

        # Thêm variations
        for var in variations:
            variation_obj = Variation(
                type=var["type"],
                name=var["name"],
                option=var["option"],
                image=var["image"],
                price=var["price"],
                oldPrice=var["oldPrice"],
                quantity=var["quantity"],
                sold=var["sold"],
                productId=product.id,
            )
            db.session.add(variation_obj)

        # Thêm images
        for img in images:
            image_obj = ProductImage(
                link=img["link"],
                isPrimary=img["isPrimary"],
                productId=product.id,
            )
            db.session.add(image_obj)

        db.session.commit()
        return product

    # Cập nhật thông tin sản phẩm
    def editProduct(
        productId: int,
        productName: str,
        slug: str,
        description: str,
        properties: List[object],
        categories: List[object],
        variations: List[object],
        images: List[str],
    ):
        product = ProductService.getDetailProduct(productId)
        if product is None:
            return Response(404, "Product not found")
        product.name = productName
        product.slug = slug
        product.description = description

        # Cập nhật properties
        existing_properties = {prop.name: prop for prop in product.properties}
        for prop in properties:
            if prop["name"] in existing_properties:
                existing_properties[prop["name"]].value = prop["value"]
            else:
                property_obj = ProductProperty(
                    productId=product.id,
                    name=prop.get("name"),
                    value=prop.get("value"),
                )
                product.properties.append(property_obj)

        # Cập nhật categories
        product.categories = []
        for cat in categories:
            category_obj = Category.query.get(cat["id"])
            if category_obj:
                product.categories.append(category_obj)

        # Cập nhật variations
        existing_variations = {var.id: var for var in product.variations}
        new_variation_ids = set(var["id"] for var in variations)
        for var in variations:
            if var["id"] in existing_variations:
                existing_variations[var["id"]].setType(var["type"])
                existing_variations[var["id"]].setName(var["name"])
                existing_variations[var["id"]].setOption(var["option"])
                existing_variations[var["id"]].setImage(var["image"])
                existing_variations[var["id"]].setPrice(var["price"])
                existing_variations[var["id"]].setOldPrice(var["oldPrice"])
                existing_variations[var["id"]].setQuantity(var["quantity"])
                existing_variations[var["id"]].setSold(var["sold"])
            else:
                variation_obj = Variation(
                    id=var["id"],
                    type=var["type"],
                    name=var["name"],
                    option=var["option"],
                    image=var["image"],
                    price=var["price"],
                    oldPrice=var["oldPrice"],
                    quantity=var["quantity"],
                    sold=var["sold"],
                    productId=product.id,
                )
                product.variations.append(variation_obj)

        # Xóa các variation không còn tồn tại
        for var_id, var_obj in existing_variations.items():
            if var_id not in new_variation_ids:
                db.session.delete(var_obj)

        # Cập nhật images
        existing_images = {img.link: img for img in product.images}
        new_image_links = set(img["link"] for img in images)
        for img in images:
            if img["link"] in existing_images:
                existing_images[img["link"]].isPrimary = img["isPrimary"]
            else:
                image_obj = ProductImage(
                    link=img["link"],
                    isPrimary=img["isPrimary"],
                    productId=product.id,
                )
                product.images.append(image_obj)

        # Xóa các image không còn tồn tại
        for link, img_obj in existing_images.items():
            if link not in new_image_links:
                db.session.delete(img_obj)

        db.session.commit()

        return product

    # Xoá sản phẩm khỏi database
    def removeProduct(productId: int):
        pass

    def generateProducts():
        pass
