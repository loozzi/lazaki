from flask import Blueprint, request
from src.controllers.OrderController import OrderController
from src.middlewares.AuthMiddleware import customer_middleware
from src.middlewares.PaginationMiddleware import request_pagination
from src.models.Order import Order
from src.models.OrderDetail import OrderDetail
from src.utils.response import Response

order = Blueprint("order", __name__)


@order.route("/current", methods=["GET"])
@customer_middleware
def getCurrentOrder():
    customer = request.customer
    return OrderController.viewCart(customer.id)


@order.route("/history", methods=["GET"])
@customer_middleware
@request_pagination
def getOrderHistory():
    customer = request.customer
    page = request.pagination.get("page")
    limit = request.pagination.get("limit")
    return OrderController.viewOrderHistory(customer.id, page, limit)


@order.route("/detail/<int:id>", methods=["GET"])
@customer_middleware
def getDetailOrder(id: int):
    return OrderController.getDetailOrder(id)


@order.route("/update", methods=["POST"])
@customer_middleware
def updateCurrentOrder():
    try:
        order_detail_id = int(request.form.get("orderDetailId", None))
        variation_id = int(request.form.get("variationId", None))
        product_id = int(request.form.get("productId", None))
        quantity = int(request.form.get("quantity", None))
    except Exception:
        return Response(400, "Invalid format")

    if (
        order_detail_id is None
        or variation_id is None
        or product_id is None
        or quantity is None
    ):
        return Response(400, "Missing fields")
    return OrderController.updateCurrentOrder(
        order_detail_id, variation_id, product_id, quantity
    )


@order.route("/purchase", methods=["POST"])
@customer_middleware
def purchase():
    try:
        order_id = int(request.form.get("orderId", None))
    except Exception:
        return Response(400, "Invalid format")
    full_name = request.form.get("fullName", None)
    email = request.form.get("email", None)
    phoneNumber = request.form.get("phoneNumber", None)
    province = request.form.get("province", None)
    district = request.form.get("district", None)
    ward = request.form.get("ward", None)
    street = request.form.get("street", None)
    payment_method = request.form.get("paymentMethod", None)
    note = request.form.get("note", None)

    # Kiểm tra các trường bắt buộc
    if not all(
        [
            order_id,
            full_name,
            email,
            phoneNumber,
            province,
            district,
            ward,
            street,
            payment_method,
        ]
    ):
        return Response(400, "Missing required fields")

    return OrderController.confirmOrder(
        order_id,
        full_name,
        email,
        phoneNumber,
        province,
        district,
        ward,
        street,
        payment_method,
        note,
    )


@order.route("/add", methods=["POST"])
@customer_middleware
def createOrderDetail():
    current_customer = request.customer
    orderId = request.form.get("orderId", None)
    variationId = request.form.get("variationId", None)
    productId = request.form.get("productId", None)
    quantity = request.form.get("quantity", None)
    return OrderController.addToShopCart(
        current_customer.id, orderId, variationId, productId, quantity
    )


@order.route("/<int:orderDetailId>", methods=["DELETE"])
@customer_middleware
def removeOrderDetail(orderDetailId):
    current_customer = request.customer
    orderDetailId = OrderDetail.query.filter_by(id=orderDetailId).first()
    if orderDetailId is None:
        return Response(404, "Order not found")
    return OrderController.removeFromCurrentOrder(
        current_customer.id, orderDetailId.variationId
    )
