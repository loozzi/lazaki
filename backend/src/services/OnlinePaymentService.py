from src.models import Order


class OnlinePaymentService:
    # Lấy QR code để thanh toán
    def getPaymentQR(payment: Order):
        return "https://m.media-amazon.com/images/I/41g9aFO6JLL._AC_.jpg"

    # Xác nhận thanh toán
    def confirmPayment(payment: Order):
        return payment.paymentStatus.value()
