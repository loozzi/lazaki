from flask import Blueprint, request
from src.middlewares.AuthMiddleware import customer_middleware
from src.middlewares.PaginationMiddleware import request_pagination
from src.models.Order import Order
from src.controllers.OrderController import OrderController

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
