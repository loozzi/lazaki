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
        add_variations: List[object],
        remove_variations: List[int],
        edit_variations: List[object],
        images: List[object],
        categories: List[int],
    ):
        product = ProductService.getDetailProduct(productId)
            
        product.name = productName
        product.slug = slug
        product.description = description

        # Cập nhật properties
        existing_properties = {prop.name: prop for prop in product.properties}
        new_property_names = set(prop["name"] for prop in properties)
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

        # Xóa các properties không còn tồn tại
        for prop_name, prop_obj in existing_properties.items():
            if prop_name not in new_property_names:
                db.session.delete(prop_obj)

        # Thêm variations
        existing_variations = {(var.type, var.name, var.option, var.image, var.price, var.oldPrice, var.quantity, var.sold) for var in product.variations}
        for var in add_variations:
            var_tuple = (var["type"], var["name"], var["option"], var["image"], var["price"], var["oldPrice"], var["quantity"], var["sold"])
            if var_tuple in existing_variations:
                continue
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

        # Xóa variations (xoá các variations có id trong remove_variations và productId = product.id)
        for varId in remove_variations:
            variation_obj = Variation.query.get(varId)
            if variation_obj and variation_obj.productId == product.id:
                db.session.delete(variation_obj)

        # Sửa variations
        for var in edit_variations:
            variation_obj = Variation.query.get(var["id"])
            if not variation_obj:
                continue
            variation_obj.type = var["type"]
            variation_obj.name = var["name"]
            variation_obj.option = var["option"]
            variation_obj.image = var["image"]
            variation_obj.price = var["price"]
            variation_obj.oldPrice = var["oldPrice"]
            variation_obj.quantity = var["quantity"]
            variation_obj.sold = var["sold"]

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

        # Cập nhật categories
        product.categories.clear()
        for cat_id in categories:
            category_obj = Category.query.get(cat_id)
            if category_obj:
                product.categories.append(category_obj)

        db.session.commit()

        return product

    # Xoá sản phẩm khỏi database
    def removeProduct(slug: str):
        product = Product.query.filter_by(slug=slug).first()
        if not product:
            return Response(404, "Product not found")

        # Xóa các variations liên quan
        Variation.query.filter_by(productId=product.id).delete()
        # Xóa các images liên quan
        ProductImage.query.filter_by(productId=product.id).delete()
        # Xóa các properties liên quan
        ProductProperty.query.filter_by(productId=product.id).delete()
        # Xóa các categories liên quan
        product.categories.clear()
        # Xóa sản phẩm
        db.session.delete(product)
        db.session.commit()

    def generateProducts():
        pass
