from typing import List
from src import db
from src.models.Product import Product
from src.models.Variation import Variation
from src.models.OrderDetail import OrderDetail
from src.models.Category import Category
from src.models.CategoryProduct import CategoryProduct
from sqlalchemy import or_, and_ , desc, asc
from src.controllers.Pagination import Pagination
from src.services.RecommendService import RecommendService
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
                data_one_product["rating"] = product.getRateMean()
                data.append(data_one_product)
            if sort == "desc":
                data = sorted(data,
                            key=lambda x: x["price"], reverse=True)
            else:
                data = sorted(data,
                            key=lambda x: x["price"])
            return data

    # Lấy danh sách sản phẩm
    def getProducts(self, sort, limit: int, page: int):
        all_products = db.session.query(Product).filter(
                            Product.isDeleted == False).all()
        data = self.data_response(all_products, sort)
        data = data[(page-1)*limit: limit + (page-1)*limit]
        res = Pagination(page, len(data), len(all_products), data)
        return res.serialize()


    # Tìm kiếm sản phẩm
    def searchProducts(self, keyword: str, minPrice: int,
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
                product_list = [product for product in products_join]
                product_list = self.data_response(product_list, sort)
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
                product_list = [product for product in products_join]
                product_list = self.data_response(product_list, sort)
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
                product_list = [product for product in products_join]
                product_list = self.data_response(product_list, sort)
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
                product_list = [product for product in products_join]
                product_list = self.data_response(product_list, sort)
                result = product_list[(page-1)*limit: limit + (page-1)*limit]
                product_pagination = Pagination(page, len(result),
                                                len(total_products_join), result)
                return product_pagination.serialize()


    # Lấy chi tiết của sản phẩm
    def getDetailProduct(self, productSlug: str):
        product = db.session.query(Product).filter(
                    Product.slug == productSlug).filter(
                        Product.isDeleted == False).first()
        if product is None:
            return {}
        return product.serialize()

    # Thêm sản phẩm vào database
    def addProduct(self,
        productName: str,
        description: str,
        properties: List[object],
        variations: List[object],
        images: List[object],
    ):
        pass

    def editProduct(self,
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
    def removeProduct(self, productId: int):
        pass

    def generateProducts(self, list_slug_accessed: List[str], order_list_customer: List[OrderDetail], limit: int, page: int):
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
        result = data[(page-1)*limit: limit + (page-1)*limit]
        product_pagination = Pagination(page, len(result),len(data), result)
        return product_pagination.serialize()
