from typing import List

from sqlalchemy import asc, desc, func
from sqlalchemy.orm import aliased
from src import db
from src.controllers.Pagination import Pagination
from src.models.Category import Category
from src.models.CategoryProduct import CategoryProduct
from src.models.Product import Product
from src.models.ProductImage import ProductImage
from src.models.ProductProperty import ProductProperty
from src.models.Variation import Variation
from src.services.RecommendService import RecommendService
from src.services.ReviewService import ReviewService
from src.utils.response import Response
import pandas as pd
import os
from sklearn.cluster import KMeans
from sklearn.pipeline import make_pipeline

class ProductService:

    def create_dataframe( id: int, name: str, price: int, rating_average: float, category: str, solds: int):
        new_data_frame = pd.DataFrame(
            {
                "id": [id],
                "name": [name],
                "price": [price],
                "rating_average": [rating_average],
                "category": [category],
                "solds": [solds],
            }
        )
        return new_data_frame


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
        VariationAlias = aliased(Variation)
        totalProducts = Product.query.count()
        subquery = (
            db.session.query(
                VariationAlias.productId,
                func.min(VariationAlias.id).label("min_variation_id"),
            )
            .group_by(VariationAlias.productId)
            .subquery()
        )
        order_by_query = (
            desc(Product.updatedAt) if sort == "desc" else asc(Product.updatedAt)
        )
        allProducts = (
            db.session.query(Product)
            .join(subquery, Product.id == subquery.c.productId)
            .join(Variation, Variation.id == subquery.c.min_variation_id)
            .filter(Product.isDeleted == False)
            .order_by(order_by_query)
            .limit(limit)
            .offset((page - 1) * limit)
            .all()
        )

        dataResponse = []
        for product in allProducts:
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
            dataResponse.append(data_one_product)

        response = Pagination(page, limit, totalProducts, dataResponse)
        return response.serialize()

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
        def _getResponse(product):
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
            return data_one_product

        if len(categories) == 0:
            VariationAlias = aliased(Variation)
            subquery = (
                db.session.query(
                    VariationAlias.productId,
                    func.min(VariationAlias.id).label("min_variation_id"),
                )
                .group_by(VariationAlias.productId)
                .subquery()
            )
            order_by_query = (
                desc(Variation.price) if sort == "desc" else asc(Variation.price)
            )
            allProducts = (
                db.session.query(Product)
                .join(subquery, Product.id == subquery.c.productId)
                .join(Variation, Variation.id == subquery.c.min_variation_id)
                .filter(Variation.price >= minPrice)
                .filter(Variation.price <= maxPrice)
                .filter(Product.name.ilike(f"%{keyword}%"))
                .filter(Product.isDeleted == False)
                .order_by(order_by_query)
                .limit(limit)
                .offset((page - 1) * limit)
                .all()
            )

            totalProducts = (
                db.session.query(Product)
                .join(subquery, Product.id == subquery.c.productId)
                .join(Variation, Variation.id == subquery.c.min_variation_id)
                .filter(Variation.price >= minPrice)
                .filter(Variation.price <= maxPrice)
                .filter(Product.name.ilike(f"%{keyword}%"))
                .filter(Product.isDeleted == False)
                .count()
            )

            dataResponse = []
            for product in allProducts:
                dataResponse.append(_getResponse(product))

            response = Pagination(page, limit, totalProducts, dataResponse)
            return response.serialize()
        else:
            category_ids = []
            for category in categories:
                category_obj = Category.query.filter_by(slug=category).first()
                if category_obj:
                    category_ids.append(category_obj.id)

            VariationAlias = aliased(Variation)
            subquery = (
                db.session.query(
                    VariationAlias.productId,
                    func.min(VariationAlias.id).label("min_variation_id"),
                )
                .group_by(VariationAlias.productId)
                .subquery()
            )
            order_by_query = (
                desc(Variation.price) if sort == "desc" else asc(Variation.price)
            )
            allProducts = (
                db.session.query(Product)
                .join(subquery, Product.id == subquery.c.productId)
                .join(Variation, Variation.id == subquery.c.min_variation_id)
                .join(CategoryProduct, CategoryProduct.productId == Product.id)
                .filter(CategoryProduct.categoryId.in_(category_ids))
                .filter(Variation.price >= minPrice)
                .filter(Variation.price <= maxPrice)
                .filter(Product.name.ilike(f"%{keyword}%"))
                .filter(Product.isDeleted == False)
                .order_by(order_by_query)
                .limit(limit)
                .offset((page - 1) * limit)
                .all()
            )

            totalProducts = (
                db.session.query(Product)
                .join(subquery, Product.id == subquery.c.productId)
                .join(Variation, Variation.id == subquery.c.min_variation_id)
                .join(CategoryProduct, CategoryProduct.productId == Product.id)
                .filter(CategoryProduct.categoryId.in_(category_ids))
                .filter(Variation.price >= minPrice)
                .filter(Variation.price <= maxPrice)
                .filter(Product.name.ilike(f"%{keyword}%"))
                .filter(Product.isDeleted == False)
                .count()
            )

            dataResponse = []
            for product in allProducts:
                dataResponse.append(_getResponse(product))

            response = Pagination(page, limit, totalProducts, dataResponse)
            return response.serialize()

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
        # Tạo dataframe
        data_frame = ProductService.create_dataframe(product.id, productName, variations[0]["price"],1, Category.query.get(categories[0]).name, 0)
        recommendService = RecommendService()
        file_path_csv = "./src/assets/data_cluster.csv"
        # Đọc dữ liệu từ file csv
        data_csv = pd.read_csv(file_path_csv)
        data_csv_train = data_csv.drop(columns=["cluster"], inplace=False)
        data_csv_train = pd.concat([data_csv_train, data_frame], ignore_index=True)
        prepare_pipe = recommendService.prepare_pipe(data_csv_train.drop(columns=["id"], inplace=False))
        #train model và lưu file cluster
        model_recommend = KMeans(n_clusters=150, random_state=0)
        model_pipe = make_pipeline(prepare_pipe, model_recommend)
        model_pipe.fit(data_csv_train.drop(columns=["id"]))
        clusters = model_pipe.predict(data_csv_train.drop(columns=["id"]))
        data_csv_train["cluster"] = clusters
        os.remove(file_path_csv)
        data_csv_train.to_csv(file_path_csv, index=False)
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
        # Xóa thông tin trong data_cluster
        file_path_csv = "./src/assets/data_cluster.csv"
        data_frame_cluster = pd.read_csv(file_path_csv)
        data_frame_cluster = data_frame_cluster[data_frame_cluster["id"] != product.id]
        os.remove(file_path_csv)
        data_frame_cluster.to_csv(file_path_csv, index=False)
        # Xóa sản phẩm
        db.session.delete(product)
        db.session.commit()

    def generateProducts(
        self,
        list_products_id: List[int],
        limit: int,
        page: int,
    ):
        
        recommend_service = RecommendService()
        product_recommend_ids= recommend_service.generateProducts(list_products_id)
        products_recommend = Product.query.filter(Product.id.in_(product_recommend_ids)
                                                  ).limit(limit).offset((page - 1) * limit)
        total_recommend = Product.query.filter(Product.id.in_(product_recommend_ids)).count()
        dataResponse = []
        
        for product in products_recommend:
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
            dataResponse.append(data_one_product)

        response = Pagination(page, limit, total_recommend, dataResponse)
        return response.serialize()
    # Lấy sản phẩm theo keyword, order, type
    def searchProductsAdmin(keyword: str, order: str, type: str, page: int, limit: int):
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

        return (
            searched_products.limit(limit).offset((page - 1) * limit).all(),
            searched_products.count(),
        )
