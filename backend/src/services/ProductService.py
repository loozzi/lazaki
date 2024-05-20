from typing import List

from sqlalchemy import asc, desc, func
from src import db
from src.controllers.Pagination import Pagination
from src.models.Category import Category
from src.models.OrderDetail import OrderDetail
from src.models.Product import Product
from src.models.ProductImage import ProductImage
from src.models.ProductProperty import ProductProperty
from src.models.Variation import Variation
from src.services.RecommendService import RecommendService
from src.services.ReviewService import ReviewService
from src.utils.response import Response


class ProductService:

    def data_response(self, list_product: List[Product], sort: str):
        data = []
        for product in list_product:
            info_product = product.serialize()
            data_one_product = {}
            data_one_product["name"] = info_product["name"]
            data_one_product["slug"] = product.slug
            data_one_product["image"] = product.getPrimaryImage()
            data_one_product["price"] = info_product["variations"][0]["price"]
            sold = 0
            for variation in info_product["variations"]:
                sold += variation["sold"]
            data_one_product["sold"] = sold
            data_one_product["rating"] = ReviewService.getRateMean(product.id)
            data.append(data_one_product)
        if sort == "desc":
            data = sorted(data, key=lambda x: x["price"], reverse=True)
        else:
            data = sorted(data, key=lambda x: x["price"])
        return data

    # Lấy danh sách sản phẩm
    def getProducts(self, sort, limit: int, page: int):
        all_products = (
            db.session.query(Product).filter(Product.isDeleted == False).all()
        )
        data = self.data_response(all_products, sort)
        data = data[(page - 1) * limit : limit + (page - 1) * limit]
        res = Pagination(page, len(data), len(all_products), data)
        return res.serialize()

    # Tìm kiếm sản phẩm
    def searchProducts(
        self,
        keyword: str,
        minPrice: int,
        maxPrice: int,
        categories: List[str],
        sort: str,
        limit: int,
        page: int,
    ):
        if len(categories) == 0:
            total_products_join = (
                db.session.query(Product)
                .join(Variation, Product.id == Variation.productId)
                .filter(Product.name.like(f"%{keyword}%"))
                .filter(Product.isDeleted == False)
                .filter(Variation.price >= minPrice)
                .filter(Variation.price <= maxPrice)
                .all()
            )
            if sort == "desc":
                products_join = (
                    db.session.query(Product)
                    .join(Variation, Product.id == Variation.productId)
                    .filter(Product.name.like(f"%{keyword}%"))
                    .filter(Product.isDeleted == False)
                    .filter(Variation.price >= minPrice)
                    .filter(Variation.price <= maxPrice)
                    .order_by(desc(Variation.price))
                    .all()
                )
                product_list = [product for product in products_join]
                product_list = self.data_response(product_list, sort)
                result = product_list[(page - 1) * limit : limit + (page - 1) * limit]
                product_pagination = Pagination(
                    page, len(result), len(total_products_join), result
                )
                return product_pagination.serialize()
            else:
                products_join = (
                    db.session.query(Product)
                    .join(Variation, Product.id == Variation.productId)
                    .filter(Product.name.like(f"%{keyword}%"))
                    .filter(Product.isDeleted == False)
                    .filter(Variation.price >= minPrice)
                    .filter(Variation.price <= maxPrice)
                    .order_by(asc(Variation.price))
                    .all()
                )
                product_list = [product for product in products_join]
                product_list = self.data_response(product_list, sort)
                result = product_list[(page - 1) * limit : limit + (page - 1) * limit]
                product_pagination = Pagination(
                    page, len(result), len(total_products_join), result
                )
                return product_pagination.serialize()

        else:
            comfort_categories = Category.query.filter(
                Category.name.in_(categories)
            ).all()
            product_ids = set()
            for category in comfort_categories:
                products = category.products
                for product in products:
                    product_ids.add(product.id)
            total_products_join = (
                db.session.query(Product)
                .join(Variation, Product.id == Variation.productId)
                .filter(Product.name.like(f"%{keyword}%"))
                .filter(Product.isDeleted == False)
                .filter(Variation.price >= minPrice)
                .filter(Variation.price <= maxPrice)
                .filter(Product.id.in_(product_ids))
                .all()
            )
            if sort == "desc":
                products_join = (
                    db.session.query(Product)
                    .join(Variation, Product.id == Variation.productId)
                    .filter(Product.name.like(f"%{keyword}%"))
                    .filter(Product.isDeleted == False)
                    .filter(Variation.price >= minPrice)
                    .filter(Variation.price <= maxPrice)
                    .filter(Product.id.in_(product_ids))
                    .order_by(desc(Variation.price))
                    .all()
                )
                product_list = [product for product in products_join]
                product_list = self.data_response(product_list, sort)
                result = product_list[(page - 1) * limit : limit + (page - 1) * limit]
                product_pagination = Pagination(
                    page, len(result), len(total_products_join), result
                )
                return product_pagination.serialize()
            else:
                products_join = (
                    db.session.query(Product)
                    .join(Variation, Product.id == Variation.productId)
                    .filter(Product.name.like(f"%{keyword}%"))
                    .filter(Product.isDeleted == False)
                    .filter(Variation.price >= minPrice)
                    .filter(Variation.price <= maxPrice)
                    .filter(Product.id.in_(product_ids))
                    .order_by(asc(Variation.price))
                    .all()
                )
                product_list = [product for product in products_join]
                product_list = self.data_response(product_list, sort)
                result = product_list[(page - 1) * limit : limit + (page - 1) * limit]
                product_pagination = Pagination(
                    page, len(result), len(total_products_join), result
                )
                return product_pagination.serialize()

    # Lấy sản phẩm theo id
    def getProductbyId(productId: int):
        product = Product.query.filter_by(id=productId).first()
        if not product:
            return None
        return product

    # Lấy chi tiết của sản phẩm
    def getDetailProduct(self, productSlug: str):
        product = (
            db.session.query(Product)
            .filter(Product.slug == productSlug)
            .filter(Product.isDeleted == False)
            .first()
        )
        if product is None:
            return {}
        response = product.serialize()
        response["rating"] = ReviewService.getRateMean(product.id)
        response["totalRating"] = ReviewService.getTotalRate(product.id)

        return response

    # Thêm sản phẩm vào database
    def addProduct(
        productName: str,
        description: str,
        slug: str,
        properties: List[object],
        categories: List[int],
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
            category_obj = Category.query.get(cat)
            if category_obj:
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
        product = Product.query.get(productId)

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
        existing_variations = {
            (
                var.type,
                var.name,
                var.option,
                var.image,
                var.price,
                var.oldPrice,
                var.quantity,
                var.sold,
            )
            for var in product.variations
        }
        for var in add_variations:
            var_tuple = (
                var["type"],
                var["name"],
                var["option"],
                var["image"],
                var["price"],
                var["oldPrice"],
                var["quantity"],
                var["sold"],
            )
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

    def generateProducts(
        self,
        list_slug_accessed: List[str],
        order_list_customer: List[OrderDetail],
        limit: int,
        page: int,
    ):
        list_products = []
        for order in order_list_customer:
            product = Product.query.filter_by(id=order.productId).first()
            if product is not None:
                list_products.append(product)
        for slug in list_slug_accessed:
            product = Product.query.filter_by(slug=slug).first()
            if product is not None:
                list_products.append(product)
        recommend_service = RecommendService()
        data = recommend_service.generateProducts(list_products)
        data = self.data_response(data, "asc")
        result = data[(page - 1) * limit : limit + (page - 1) * limit]
        product_pagination = Pagination(page, len(result), len(data), result)
        return product_pagination.serialize()

    # Lấy sản phẩm theo keyword, order, type
    def searchProductsAdmin(keyword: str, order: str, type: str):
        # Truy vấn tất cả sản phẩm và tổng số lượng bán được và tổng số lượng tồn kho
        searched_products = (
            db.session.query(
                Product,
                func.sum(Variation.sold).label("total_sold"),
                func.sum(Variation.quantity).label("total_quantity"),
            )
            .outerjoin(Variation)
            .filter(Product.isDeleted == False)
            .group_by(Product.id)
        )

        # Tìm kiếm sản phẩm theo keyword
        if keyword:
            searched_products = searched_products.filter(
                Product.name.ilike(f"%{keyword}%")
            )

        # Sắp xếp sản phẩm theo type và order
        if type == "sold":
            if order == "asc":
                searched_products = searched_products.order_by(asc("total_sold"))
            else:
                searched_products = searched_products.order_by(desc("total_sold"))
        elif type == "quantity":
            if order == "asc":
                searched_products = searched_products.order_by(asc("total_quantity"))
            else:
                searched_products = searched_products.order_by(desc("total_quantity"))

        return searched_products.all()
