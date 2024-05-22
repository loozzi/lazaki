from typing import List

from src import db
from src.models.Order import Order
from src.models.OrderDetail import OrderDetail
from src.models.Product import Product
from src.models.Rating import Rating
from src.models.RatingImage import RatingImage


class ReviewService:
    # Thêm đánh giá cho mặt hàng
    def addReview(
        customerId: int,
        orderDetailId: int,
        variationId: int,
        productId: int,
        value: int,
        content: str,
        images: List[str],
    ):
        new_rating = Rating(
            customerId=customerId,
            orderDetailId=orderDetailId,
            variationId=variationId,
            productId=productId,
            value=value,
            content=content,
        )
        db.session.add(new_rating)
        db.session.commit()

        # Lưu ảnh đánh giá
        for image in images:
            new_image = RatingImage(ratingId=new_rating.id, link=image)
            db.session.add(new_image)
            db.session.commit()

        return new_rating

    # Lấy danh sách đánh giá mặt hàng theo slug
    def getReviews(slug: str, page: int, limit: int):
        all_ratings = (
            Rating.query.join(Product)
            .filter(Product.slug == slug)
            .paginate(page=page, per_page=limit)
        )
        totalRatings = Rating.query.join(Product).filter(Product.slug == slug).count()
        return all_ratings, totalRatings

    # Lấy danh sách tất cả đánh giá
    def getAllReviews():
        all_ratings = Rating.query.all()
        return all_ratings

    # Lấy tất cả đánh giá của một order
    def getReviewsByOrder(orderId: int):
        order_ratings = (
            db.session.query(Rating)
            .join(OrderDetail, Rating.orderDetailId == OrderDetail.id)
            .join(Order, OrderDetail.orderId == Order.id)
            .filter(Order.id == orderId)
            .all()
        )
        return order_ratings

    def getRateMean(productId: int):
        rate_list = Rating.query.filter_by(productId=productId).all()
        if len(rate_list) == 0:
            return 0
        sum = 0
        for i in rate_list:
            sum += i.value
        return sum / len(rate_list)

    def getTotalRate(productId: int):
        return Rating.query.filter_by(productId=productId).count()
