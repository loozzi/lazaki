from flask import Blueprint
from src.middlewares.AuthMiddleware import customer_middleware
from src.controllers.PaymentController import PaymentController

payment = Blueprint("payment", __name__)


@payment.route("/<string: orderId>", methods=["GET"])
@customer_middleware
def getPaymentQr(orderId):
    return PaymentController.payOnline(orderId)
