from flask import Blueprint, request
from src.models.Variation import Variation
from src.middlewares.AuthMiddleware import customer_middleware
from src.middlewares.PaginationMiddleware import request_pagination
from src.utils.response import Response
from src.controllers.ReviewController import RatingController

review = Blueprint("review", __name__)


@review.route("/<string:slug>", methods=["GET"])
@customer_middleware
@request_pagination
def getReviews(slug):
    page = request.pagination.get("page")
    limit = request.pagination.get("limit")
    return RatingController.getReviews(slug, page, limit)


@review.route("/", methods=["GET"])
@customer_middleware
def getReview():
    orderId = request.args.get("orderId")
    return RatingController.getReviewsByOrder(orderId)


@review.route("/", methods=["POST"])
@customer_middleware
def createReview():
    customer = request.customer
    value = request.form.get("value")
    content = request.form.get("content")
    try:
        orderDetailId = int(request.form.get("orderDetailId"))
        variationId = int(request.form.get("variationId"))
        productId = int(request.form.get("productId"))
        images = eval(request.form.get("images"))
    except Exception:
        return Response(400, "Invalid format")

    # Kiểm tra các trường bắt buộc
    if (
        orderDetailId is None
        or variationId is None
        or productId is None
        or value is None
        or content is None
    ):
        return Response(400, "Missing fields")

    # Kiểm tra xem có phải variation của product không
    variation = Variation.query.filter_by(id=variationId, productId=productId).first()

    if not variation:
        return Response(400, "Variation does not belong to the specified product")

    return RatingController.createReview(
        customer.id,
        orderDetailId,
        variationId,
        productId,
        value,
        content,
        images,
    )
