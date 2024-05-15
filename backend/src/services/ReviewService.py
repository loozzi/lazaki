from typing import List


class ReviewService:
    # Thêm đánh giá cho mặt hàng
    def addReview(orderDetailId: int, comment: str, value: int, images: List[str]):
        pass

    # Lấy danh sách đánh giá của 1 mặt hàng
    def getReviews(productId: int):
        pass
