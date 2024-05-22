from sqlalchemy import asc, desc
from src.models import Category, Customer, Order, Product
from src.services.TokenService import TokenService
from src.utils.enums import OrderStatusEnum


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

    def getOrders(page: int, limit: int, sort: str):
        totalOrders = Order.query.filter(Order.status != OrderStatusEnum.ORDER).count()
        order_by = desc(Order.orderDate) if sort == "desc" else asc(Order.orderDate)
        _orders = (
            Order.query.order_by(order_by)
            .filter(Order.status != OrderStatusEnum.ORDER)
            .paginate(page=page, per_page=limit)
        )

        orders = []
        for order in _orders.items:
            orders.append(order.serialize())

        return orders, totalOrders
