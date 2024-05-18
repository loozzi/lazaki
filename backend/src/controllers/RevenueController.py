from typing import List

from src.models import Category, CategoryProduct, OrderDetail, Product
from src.utils.enums import OrderStatusEnum
from src.utils.response import Response
from src import db


class RevenueController:
    # Tính tổng doanh thu
    def getTotalRevenue(orders):
        total_revenue = sum(
            order.totalAmount
            for order in orders
            if order.status == OrderStatusEnum.SUCCESS
        )
        total_order = len(orders)
        pending_order = sum(
            1 for order in orders if order.status == OrderStatusEnum.PREPARING
        )
        completed_order = sum(
            1 for order in orders if order.status == OrderStatusEnum.SUCCESS
        )

        return Response(
            200,
            "Success",
            {
                "totalRevenue": total_revenue,
                "totalOrder": total_order,
                "pendingOrder": pending_order,
                "completedOrder": completed_order,
            },
        )

    # Tính doanh thu theo Category
    def calculateCategoryRevenue(orders, slug):
        total_revenue = 0
        total_order = 0
        pending_order = 0
        completed_order = 0

        for order in orders:
            for detail in order.orderDetails:
                # Join bảng order_detail, product và category_product để kiểm tra slug
                result = (
                    db.session.query(OrderDetail)
                    .join(Product)
                    .join(CategoryProduct)
                    .join(Category)
                    .filter(Category.slug == slug)
                    .filter(OrderDetail.orderId == order.id)
                    .all()
                )

                if result:
                    total_order += 1
                    if order.status == OrderStatusEnum.PREPARING:
                        pending_order += 1
                    elif order.status == OrderStatusEnum.SUCCESS:
                        completed_order += 1
                        total_revenue += detail.price * detail.quantity

        return Response(
            200,
            "Success",
            {
                "totalRevenue": total_revenue,
                "totalOrder": total_order,
                "pendingOrder": pending_order,
                "completedOrder": completed_order,
            },
        )

    # Tính doanh thu theo Product
    def calculateProductRevenue(orders, slug):
        total_revenue = 0
        total_order = 0
        pending_order = 0
        completed_order = 0

        for order in orders:
            for detail in order.orderDetails:
                result = (
                    db.session.query(OrderDetail)
                    .join(Product)
                    .filter(Product.slug == slug)
                    .all()
                )

                if result:
                    total_order += 1
                    if order.status == OrderStatusEnum.PREPARING:
                        pending_order += 1
                    elif order.status == OrderStatusEnum.SUCCESS:
                        completed_order += 1
                        total_revenue += detail.price * detail.quantity

        return Response(
            200,
            "Success",
            {
                "totalRevenue": total_revenue,
                "totalOrder": total_order,
                "pendingOrder": pending_order,
                "completedOrder": completed_order,
            },
        )
