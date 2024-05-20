from typing import List

from src.controllers.Pagination import Pagination
from src.services.ReviewService import ReviewService
from src.utils.response import Response


class RatingController:
    def createReview(
        customerId: int,
        orderDetailId: int,
        variationId: int,
        productId: int,
        value: int,
        content: str,
        images: List[str],
    ):
        new_review = ReviewService.addReview(
            customerId,
            orderDetailId,
            variationId,
            productId,
            value,
            content,
            images,
        )
        return Response(
            200,
            "Success",
            new_review.serialize(),
        )

    # Lấy danh sách đánh giá mặt hàng theo slug
    def getReviews(slug: str, page: int, limit: int):
        all_ratings = ReviewService.getReviews(slug)

        total = len(all_ratings)
        if total == 0:
            return Response(404, "No review found")
        start = (page - 1) * limit
        end = min(start + limit, total)
        paginated_ratings = all_ratings[start:end]

        # Chuẩn bị dữ liệu trả về
        rating_data = []
        for rating in paginated_ratings:
            rating_data.append(rating.serialize())

        pagination = Pagination(
            currentPage=page, perPage=limit, total=total, data=rating_data
        )

        return Response(200, "Success", pagination.serialize())

    # Lấy tất cả đánh giá của một order
    def getReviewsByOrder(orderId: int):
        order_ratings = ReviewService.getReviewsByOrder(orderId)

        # Chuẩn bị dữ liệu trả về
        rating_data = []
        for rating in order_ratings:
            rating_data.append(rating.serialize())

        return Response(200, "Success", rating_data)
