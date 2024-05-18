from flask import Blueprint, request
from src.middlewares.AuthMiddleware import customer_middleware
from src.models.Order import Order
from src.controllers.OrderController import OrderController

order = Blueprint("order", __name__)


@order.route("/current", methods=["GET"])
@customer_middleware
def getCurrentOrder():
    customer = request.customer
    return OrderController.viewCart(customer.id)
