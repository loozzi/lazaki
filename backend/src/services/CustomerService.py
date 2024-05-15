from src.models import Customer
from src.utils.enums import CustomerStatusEnum


class CustomerService:
    # Lấy thông tin khách hàng
    def getCustomer(uid: str):
        try:
            customer = Customer.query.filter_by(uid=uid).first()
            return customer
        except Exception as e:
            e
            return None

    # Lấy danh sách khách hàng
    def getCustomers():
        pass

    # Thêm khách hàng
    def createCustomer(data: dict):
        customer = Customer(
            uid=data["uid"],
            email=data["email"],
            fullName=data["name"],
            status=CustomerStatusEnum.ACTIVE,
        )
        customer.save()

    # Cập nhật thông tin khách hàng
    def update(customerId: int):
        pass
