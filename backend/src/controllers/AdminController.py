from typing import List
from src.models import Product
from src.models import Category
from src.models import ProductProperty, ProductImage, Variation, Address, Customer
from src.controllers.Pagination import Pagination
from src.utils.enums import CustomerStatusEnum
from src.services.CustomerService import CustomerService
from src.services.ProductService import ProductService
from src.utils.response import Response
from src import db


class AdminController:
    # Đăng nhập Admin
    def login(username: str, password: str):
        pass

    # Lấy danh sách sản phẩm
    def getProducts(page: int, limit: int, sort: str):
        pass

    def getProductDetail(slug: str):
        pass

    # Chỉnh sửa thông tin sản phẩm
    def editProduct(
        productId: int,
        productName: str,
        slug: str,
        description: str,
        properties: List[object],
        categories: List[object],
        variations: List[object],
        images: List[str],
    ):
        product = ProductService.editProduct(
            productId,
            productName,
            slug,
            description,
            properties,
            categories,
            variations,
            images,
        )

        return Response(200, "Success", product.serialize())

    # Thêm sản phẩm
    def addProduct(
        productName: str,
        description: str,
        slug: str,
        properties: List[object],
        categories: List[object],
        variations: List[object],
        images: List[str],
    ):
        product = ProductService.addProduct(
            productName, description, slug, properties, categories, variations, images
        )
        return Response(200, "Success", data=product.serialize())

    # Xóa sản phẩm
    def removeProduct(productId: int):
        pass

    # Lấy danh sách đơn hàng
    def getOrders(page: int, limit: int, sort: str):
        pass

    # Chỉnh sửa đơn hàng
    def editOrder(orderId: int, status: str):
        pass

    # Hủy bỏ đơn hàng
    def cancelOrder(orderId: int):
        pass

    # Chỉnh sửa đơn hàng
    def updateOrder(orderId: int, status: str, shippingName: str, shippingCode: str):
        pass

    # Lấy thông tin tất cả khách hàng
    def getCustomers(page: int, limit: int, sort: str):
        all_Customers = CustomerService.getCustomers()

        # Sắp xếp danh sách khách hàng
        sort_column = getattr(Customer, sort, None)
        if sort_column is None:
            sort_column = Customer.id
        sorted_customers = sorted(all_Customers, key=lambda x: getattr(x, sort))

        # Phân trang danh sách khách hàng
        total_customers = len(sorted_customers)
        start = (page - 1) * limit
        end = min(start + limit, total_customers)
        paginated_customers = sorted_customers[start:end]

        # Chuẩn bị dữ liệu trả về
        customers_data = []
        for customer in paginated_customers:
            address = Address.query.get(customer.addressId)
            customer_data = customer.serialize()
            if address:
                customer_data["address"] = address.serialize()
            customers_data.append(customer_data)

        pagination = Pagination(
            currentPage=page, perPage=limit, total=total_customers, data=customers_data
        )

        return Response(200, "Success", pagination.serialize())

    # Chỉnh sửa thông tin khách hàng
    def editCustomer(customerId: int):
        customer = CustomerService.getCustomerById(customerId)
        if customer is None:
            return Response(404, "Customer not found")
        customer.setStatus(CustomerStatusEnum.DEACTIVE)
        db.session.commit()
        return Response(200, "Success")

    # Doanh thu
    def getRevenue():
        pass
