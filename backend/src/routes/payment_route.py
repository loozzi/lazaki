from flask import Blueprint, request
from src.middlewares.AuthMiddleware import customer_middleware
from src.controllers.PaymentController import PaymentController


payment = Blueprint("payment", __name__)


@payment.route("/<string: orderId>", methods=["GET"])
@customer_middleware
def getPaymentQr(orderId):
    return PaymentController.payOnline(orderId)


@payment.route("/confirm", methods=["POST"])
@customer_middleware
def confirmPayment():
    orderId = request.form.get("orderId", "")
    return PaymentController.confirmPayment(orderId)
