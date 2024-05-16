from src.models import Order
from src.services.OnlinePaymentService import OnlinePaymentService
from src.utils.response import Response


class PaymentController:
    # Thanh toán Online
    def payOnline(orderId: int):
        payment = Order.query.filter_by(id=orderId).first()
        if payment is None:
            return Response(404, "Thanh toán không tồn tại")
        return OnlinePaymentService.getPaymentQR()

    def confirmPayment():
        pass
