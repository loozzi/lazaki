from src.models import Category, Customer, Product
from src.services.TokenService import TokenService


class AdminService:
    # Kiểm tra quản trị viên hợp lệ
    def verify(token: str):
        data = TokenService.verify(token)
        if not data:
            return None
        return data

    def getOverview():
        totalProduct = Product.query.count()
        totalCategory = Category.query.count()
        totalCustomer = Customer.query.count()
        return totalProduct, totalCategory, totalCustomer
