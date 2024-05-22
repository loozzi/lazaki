from typing import List

import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from src.models.Product import Product
from src.services.ReviewService import ReviewService
import os
import joblib


class RecommendService:
    # Giới thiệu sản phẩm người dùng có thể thích

    def create_dataframe(self, list_product: List[Product]):
        list_name = []
        list_price = []
        list_rating_average = []
        list_category = []
        list_solds = []
        for product in list_product:
            info = product.serialize()
            list_name.append(info["name"])
            list_price.append(info["variations"][0]["price"])
            list_rating_average.append(ReviewService.getRateMean(info["id"]))
            if len(info["categories"]) == 0:
                list_category.append(product.name)
            else:
                list_category.append(info["categories"][0]["name"])
            
            list_solds.append(info["variations"][0]["sold"])
        new_data_frame = pd.DataFrame(
            {
                "name": list_name,
                "price": list_price,
                "rating_average": list_rating_average,
                "category": list_category,
                "solds": list_solds,
            }
        )
        return new_data_frame

    def prepare_pipe(self, data_frame_product: pd.DataFrame):
        numeric_cols = data_frame_product[["price", "rating_average", "solds"]]
        object_cols = data_frame_product[["category", "name"]]
        column_trans_numeric = ColumnTransformer(
            transformers=[
                (
                    "price_scaler",
                    StandardScaler(with_mean=False, with_std=True),
                    ["price"],
                ),
                (
                    "sold_scale",
                    StandardScaler(with_mean=False, with_std=True),
                    ["solds"],
                ),
                (
                    "rating_scale",
                    StandardScaler(with_mean=False, with_std=True),
                    ["rating_average"],
                ),
            ],
            remainder="passthrough",
        )
        column_trans_numeric.fit(numeric_cols)
        column_trans_object = ColumnTransformer(
            [
                ("category", OneHotEncoder(dtype=int), ["category"]),
                ("name", OneHotEncoder(dtype=int), ["name"]),
            ],
            remainder="passthrough",
        )
        column_trans_object.fit(object_cols)
        id_nums = []
        for i in numeric_cols.columns:
            id_nums.append(data_frame_product.columns.get_loc(i))
        id_cate = []
        for i in object_cols.columns:
            id_cate.append(data_frame_product.columns.get_loc(i))
        preprocessor = ColumnTransformer(
            [
                ("num_col", column_trans_numeric, id_nums),
                ("obj_col", column_trans_object, id_cate),
            ]
        )
        PreparePipe = make_pipeline(preprocessor)
        return PreparePipe


    def save_and_load_model(self, data_frame_all_product, model_path):
        prepare_pipe = self.prepare_pipe(data_frame_all_product)
        model_recommend = KMeans(n_clusters=200)
        model_pipe = make_pipeline(prepare_pipe, model_recommend)
        model_pipe.fit(data_frame_all_product)
        joblib.dump(model_pipe, model_path)
        return model_pipe


    def generateProducts(self, list_product_id: List[int]):
        product_ids = set(list_product_id)
        current_directory = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(current_directory, "data_cluster.csv")
        data_frame_all_product = pd.read_csv(model_path)
        clusters = set(data_frame_all_product.loc[data_frame_all_product["id"].isin(product_ids)]["cluster"])
        list_product_id_recommend = set(data_frame_all_product.loc[
                                        data_frame_all_product["cluster"].isin(clusters)].head(30)["id"])
        return list_product_id_recommend
