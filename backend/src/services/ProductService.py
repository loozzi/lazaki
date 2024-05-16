from typing import List
from src import db
from src.models.Product import Product
from src.models.OrderDetail import OrderDetail
from src.models.Category import Category
from sqlalchemy import or_, and_
class ProductService:
    # Lấy danh sách sản phẩm
    def getProducts(sort):
        all_products = db.session.query(Product).filter(
                            Product.isDeleted == False).all()
        data = []
        for product in all_products:
            info_product = product.getInfomation()
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
        return data


    # Tìm kiếm sản phẩm
    def searchProducts( keyword: str, minPrice: int,
                       maxPrice: int, categories: List[str], sort: str):
        if minPrice == "":
            minPrice = 0
        if maxPrice == "":
            maxPrice = 999999999
        if minPrice != 0:
            minPrice = int(minPrice)
        if maxPrice != 999999999:
            maxPrice = int(maxPrice)
        data_products = []
        if categories == []:
            products = db.session.query(Product).filter(
                            Product.name.like(f"%{keyword}%")
                                ).filter(Product.isDeleted == False).all()
            for product in products:
                info_product = product.getInfomation()
                list_vari = info_product["variations"]
                list_vari = sorted(list_vari, key=lambda x: x["price"])
                if (list_vari[0]["price"] >= minPrice and 
                    list_vari[0]["price"] <= maxPrice):

                    data_products.append(info_product)
        else:
            comfort_categories = Category.query.filter(
                                    Category.name.in_(categories)).all()
            for category in comfort_categories:
                products = category.products
                for product in products:
                    info_product = product.getInfomation()
                    list_vari = info_product["variations"]
                    list_vari = sorted(list_vari, key=lambda x: x["price"])
                    if (list_vari[0]["price"] >= minPrice and 
                        list_vari[0]["price"] <= maxPrice):
                        data_products.append(info_product)
        if sort == "desc":
            data_products = sorted(data_products,
                                   key=lambda x: x["variations"][0]["price"],
                                   reverse=True)
        else:
            data_products = sorted(data_products,
                                   key=lambda x: x["variations"][0]["price"])
        return data_products


    # Lấy chi tiết của sản phẩm
    def getDetailProduct(productSlug: str):
        product = db.session.query(Product).filter(
                    Product.slug == productSlug).first()
        if product is None:
            return {}
        return product.getInfomation()

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
