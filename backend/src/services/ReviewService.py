from typing import List

from src.models.Rating import Rating


class ReviewService:
    # Thêm đánh giá cho mặt hàng
    def addReview(orderDetailId: int, comment: str, value: int, images: List[str]):
        pass

    # Lấy danh sách đánh giá của 1 mặt hàng
    def getReviews(productId: int):
        pass

    def getRateMean(productId: int):
        rate_list = Rating.query.filter_by(productId=productId).all()
        if len(rate_list) == 0:
            return 0
        sum = 0
        for i in rate_list:
            sum += i.value
        return sum / len(rate_list)
