from src.models import Order
from src.utils.enums import PaymentStatusEnum
from src.utils.response import Response


class OnlinePaymentService:
    # Lấy QR code để thanh toán
    def getPaymentQR(payment: Order):
        return Response(
            200,
            "Lấy QR thành công",
            {"qrCode": "https://m.media-amazon.com/images/I/41g9aFO6JLL._AC_.jpg"},
        )

    # Xác nhận thanh toán
    def confirmPayment(payment: Order):
        payment.setConfirm(PaymentStatusEnum.PAID)
        payment.update()
        return Response(200, "Xác nhận thành công", payment.paymentStatus.value)
