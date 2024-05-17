from typing import List
from src import db
from src.models.Product import Product
from src.models.Variation import Variation
from src.models.OrderDetail import OrderDetail
from src.models.Category import Category
from src.models.CategoryProduct import CategoryProduct
from sqlalchemy import or_, and_ , desc, asc
from src.controllers.Pagination import Pagination

class ProductService:
    # Lấy danh sách sản phẩm
    def getProducts(sort, limit: int, page: int):
        all_products = db.session.query(Product).filter(
                            Product.isDeleted == False).all()
        data = []
        for product in all_products:
            info_product = product.serialize()
            data_one_product = {}
            data_one_product["name"] = info_product["name"]
            data_one_product["slug"] = product.slug
            data_one_product["image"] = product.getPrimaryImage()
            data_one_product["price"] = info_product["variations"][0]["price"]
            data_one_product["rating"] = product.getRateMean()
            data.append(data_one_product)
        if sort == "desc":
            data = sorted(data,
                          key=lambda x: x["price"], reverse=True)
        else:
            data = sorted(data,
                          key=lambda x: x["price"])
        data = data[(page-1)*limit: limit + (page-1)*limit]
        res = Pagination(page, len(data), len(all_products), data)
        return res.serialize()


    # Tìm kiếm sản phẩm
    def searchProducts(keyword: str, minPrice: int,
                       maxPrice: int, categories: List[str], sort: str,
                       limit: int, page: int):
        if len(categories)  == 0:
            total_products_join = db.session.query(Product).join(
                Variation, Product.id == Variation.productId).filter(
                    Product.name.like(f"%{keyword}%")).filter(
                        Product.isDeleted == False).filter(
                            Variation.price >= minPrice).filter(
                                Variation.price <= maxPrice).all()
            if sort == "desc":
                products_join = db.session.query(Product).join(
                Variation, Product.id == Variation.productId).filter(
                    Product.name.like(f"%{keyword}%")).filter(
                        Product.isDeleted == False).filter(
                            Variation.price >= minPrice).filter(
                                Variation.price <= maxPrice).order_by(
                                        desc(Variation.price)).all()
                product_list = [product.serialize() for product in products_join]
                result = product_list[(page-1)*limit: limit + (page-1)*limit]
                product_pagination = Pagination(page, len(result),
                                                len(total_products_join), result)
                return product_pagination.serialize()
            else:
                products_join = db.session.query(Product).join(
                Variation, Product.id == Variation.productId).filter(
                    Product.name.like(f"%{keyword}%")).filter(
                        Product.isDeleted == False).filter(
                            Variation.price >= minPrice).filter(
                                Variation.price <= maxPrice).order_by(
                                        asc(Variation.price)).all()
                product_list = [product.serialize() for product in products_join]
                result = product_list[(page-1)*limit: limit + (page-1)*limit]
                product_pagination = Pagination(page, len(result),
                                                len(total_products_join), result)
                return product_pagination.serialize()
        else:
            comfort_categories = Category.query.filter(
                                    Category.name.in_(categories)).all()
            product_ids = set()
            for category in comfort_categories:
                products = category.products
                for product in products:
                    product_ids.add(product.id)
            total_products_join = db.session.query(Product).join(
                Variation, Product.id == Variation.productId).filter(
                    Product.name.like(f"%{keyword}%")).filter(
                        Product.isDeleted == False).filter(
                            Variation.price >= minPrice).filter(
                                Variation.price <= maxPrice).filter(
                                    Product.id.in_(product_ids)).all()
            if sort == "desc":
                products_join = db.session.query(Product).join(
                Variation, Product.id == Variation.productId).filter(
                    Product.name.like(f"%{keyword}%")).filter(
                        Product.isDeleted == False).filter(
                            Variation.price >= minPrice).filter(
                                Variation.price <= maxPrice).filter(
                                    Product.id.in_(product_ids)).order_by(
                                        desc(Variation.price)).all()
                product_list = [product.serialize() for product in products_join]
                result = product_list[(page-1)*limit: limit + (page-1)*limit]
                product_pagination = Pagination(page, len(result),
                                                len(total_products_join), result)
                return product_pagination.serialize()
            else:
                products_join = db.session.query(Product).join(
                Variation, Product.id == Variation.productId).filter(
                    Product.name.like(f"%{keyword}%")).filter(
                        Product.isDeleted == False).filter(
                            Variation.price >= minPrice).filter(
                                Variation.price <= maxPrice).filter(
                                    Product.id.in_(product_ids)).order_by(
                                        asc(Variation.price)).all()
                product_list = [product.serialize() for product in products_join]
                result = product_list[(page-1)*limit: limit + (page-1)*limit]
                product_pagination = Pagination(page, len(result),
                                                len(total_products_join), result)
                return product_pagination.serialize()


    # Lấy chi tiết của sản phẩm
    def getDetailProduct(productSlug: str):
        product = db.session.query(Product).filter(
                    Product.slug == productSlug).filter(
                        Product.isDeleted == False).first()
        if product is None:
            return {}
        return product.serialize()

    # Thêm sản phẩm vào database
    def addProduct(
        productName: str,
        description: str,
        properties: List[object],
        variations: List[object],
        images: List[object],
    ):
        pass

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
        pass

    # Xoá sản phẩm khỏi database
    def removeProduct(productId: int):
        pass

    def generateProducts():
        pass
