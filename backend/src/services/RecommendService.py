from src.models.Product import Product
from typing import List
import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import make_pipeline

class RecommendService:
    # Giới thiệu sản phẩm người dùng có thể thích

    def create_dataframe(self, list_product: List[Product]):
        list_name = []
        list_price = []
        list_rating_average= []
        list_category = []
        list_solds = []
        for product in list_product:
            info = product.serialize()
            list_name.append(info["name"])
            list_price.append(info["variations"][0]["price"])
            list_rating_average.append(product.getRateMean())
            list_category.append(info["categories"][0]["name"])
            list_solds.append(info["variations"][0]["sold"])
        new_data_frame = pd.DataFrame({'name': list_name, 'price': list_price, 'rating_average': list_rating_average, 'category': list_category, 'solds': list_solds})
        return new_data_frame



    def prepare_pipe(self, data_frame_product: pd.DataFrame):
        numeric_cols = data_frame_product[['price', 'rating_average', 'solds']]
        object_cols = data_frame_product[['category', 'name']]
        column_trans_numeric = ColumnTransformer(
                transformers=[
                    ("price_scaler", StandardScaler(with_mean=False, with_std=True),["price"]),
                    ("sold_scale",StandardScaler(with_mean=False, with_std=True),["solds"]),
                    ("rating_scale",StandardScaler(with_mean=False, with_std=True),["rating_average"]),
                ], remainder="passthrough")
        column_trans_numeric.fit(numeric_cols)
        column_trans_object = ColumnTransformer([("category", OneHotEncoder(dtype=int),["category"]),
                                             ("name", OneHotEncoder(dtype=int), ["name"])], remainder="passthrough")
        column_trans_object.fit(object_cols)
        id_nums = []
        for i in numeric_cols.columns:
            id_nums.append(data_frame_product.columns.get_loc(i))
        id_cate = []
        for i in object_cols.columns:
            id_cate.append(data_frame_product.columns.get_loc(i))
        preprocessor = ColumnTransformer([
            ("num_col", column_trans_numeric, id_nums),
            ("obj_col", column_trans_object, id_cate),
        ])
        PreparePipe = make_pipeline(preprocessor)
        return PreparePipe


    def generateProducts(self, list_product: List[Product]):
        products_recommend = []
        all_product = Product.query.filter(Product.isDeleted == False).all()
        data_frame_all_product = self.create_dataframe(all_product)
        prepare_pipe = self.prepare_pipe(data_frame_all_product)
        model_recommend = KMeans(n_clusters=100)
        model_pipe = make_pipeline(prepare_pipe, model_recommend)
        model_pipe.fit(data_frame_all_product)
        data_frame_list_product = self.create_dataframe(list_product)
        cluster_all_product = model_pipe.predict(data_frame_all_product)
        cluster_set_product = set(model_pipe.predict(data_frame_list_product))
        for i in range(len(cluster_all_product)):
            if cluster_all_product[i] in cluster_set_product:
                products_recommend.append(all_product[i])
            if len(products_recommend) == 30:
                break
        return products_recommend
        
