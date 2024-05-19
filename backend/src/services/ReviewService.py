from typing import List
from src.models.RatingImage import RatingImage
from src.models.OrderDetail import OrderDetail
from src.models.Rating import Rating
from src.models.Product import Product
from src.models.Order import Order
from src import db


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

    # Lấy danh sách đánh giá mặt hàng theo slug
    def getReviews(slug: str):
        all_ratings = Rating.query.join(Product).filter(Product.slug == slug).all()
        return all_ratings

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
