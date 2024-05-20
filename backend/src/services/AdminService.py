from src.models import Category, Customer, Product


class AdminService:
    # Kiểm tra quản trị viên hợp lệ
    def verify(token: str):
        pass

    def getOverview():
        totalProduct = Product.query.count()
        totalCategory = Category.query.count()
        totalCustomer = Customer.query.count()
        return totalProduct, totalCategory, totalCustomer
