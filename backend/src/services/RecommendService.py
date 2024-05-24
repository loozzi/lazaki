from typing import List

import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from src.models.Category import Category
from src.models.Product import Product
from src.models.Variation import Variation
from src.services.ReviewService import ReviewService


class RecommendService:
    # Giới thiệu sản phẩm người dùng có thể thích

    def create_dataframe(self, list_product: List[Product]):
        list_id = []
        list_name = []
        list_price = []
        list_rating_average = []
        list_category = []
        list_solds = []
        for product in list_product:
            list_id.append(product.id)
            list_name.append(product.name)
            variations = Variation.query.filter_by(productId=product.id).all()
            list_price.append(variations[0].price)
            list_rating_average.append(ReviewService.getRateMean(product.id))
            if len(product.categories) != 0:
                category = Category.query.filter_by(id=product.categories[0].id).first()
                list_category.append(category.name)
            else:
                list_category.append(product.name)
            solds = 0
            for variation in variations:
                solds += variation.sold
            list_solds.append(solds)
        new_data_frame = pd.DataFrame(
            {
                "id": list_id,
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

    def generateProducts(self, list_product_id: List[int]):
        product_ids = set(list_product_id)
        model_path = "./src/assets/data_cluster.csv"
        data_frame_all_product = pd.read_csv(model_path)
        clusters = set(
            data_frame_all_product.loc[data_frame_all_product["id"].isin(product_ids)][
                "cluster"
            ]
        )
        if len(clusters) == 0:
            return []
        product_recommend = list(
            data_frame_all_product.loc[
                (data_frame_all_product["cluster"].isin(clusters))
                & (~data_frame_all_product["id"].isin(product_ids))
            ].head(30)["id"]
        )

        return product_recommend
