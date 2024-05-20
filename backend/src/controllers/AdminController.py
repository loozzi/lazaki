from typing import List

from src.controllers.Pagination import Pagination
from src.controllers.RevenueController import RevenueController
from src.models import Address, Customer, Variation
from src.services.AdminService import AdminService
from src.services.CategoryService import CategoryService
from src.services.CustomerService import CustomerService
from src.services.OrderService import OrderService
from src.services.ProductService import ProductService
from src.services.ReviewService import ReviewService
from src.utils.enums import CustomerStatusEnum
from src.utils.response import Response


class AdminController:
    # Đăng nhập Admin
    def login(username: str, password: str):
        pass

    # Lấy danh sách sản phẩm
    def getProducts(page: int, limit: int, keyword: str, order: str, type: str):
        # Lấy danh sách sản phẩm (kết quả trả về là một tuple)
        products = ProductService.searchProductsAdmin(keyword, order, type)

        total = len(products)
        if total == 0:
            return Response(404, "No product found")
        start = (page - 1) * limit
        end = min(start + limit, total)
        paginated_products = products[start:end]

        # Chuẩn bị dữ liệu trả về
        product_data = []
        for product, total_sold, total_quantity in paginated_products:
            product_detail = product.getInfo()
            product_detail["sold"] = total_sold
            product_detail["quantity"] = total_quantity
            product_detail["rating"] = ReviewService.getRateMean(product.id)
            product_data.append(product_detail)

        pagination = Pagination(
            currentPage=page, perPage=limit, total=total, data=product_data
        )

        return Response(200, "Success", pagination.serialize())

    def getProductDetail(slug: str):
        pass

    # Chỉnh sửa thông tin sản phẩm
    def editProduct(
        productId: int,
        productName: str,
        slug: str,
        description: str,
        properties: List[object],
        add_variations: List[object],
        remove_variations: List[int],
        edit_variations: List[object],
        images: List[object],
        categories: List[int],
    ):
        productService = ProductService()
        product = productService.getDetailProduct(productId)
        if product is None:
            return Response(404, "Product not found")

        # Kiểm tra list remove_variations có chứa id không thuộc product không
        for varId in remove_variations:
            if Variation.query.get(varId).productId != productId:
                return Response(400, "Invalid remove_variations")

        product = ProductService.editProduct(
            productId,
            productName,
            slug,
            description,
            properties,
            add_variations,
            remove_variations,
            edit_variations,
            images,
            categories,
        )
        return Response(200, "Success", product.serialize())

    # Thêm sản phẩm
    def addProduct(
        productName: str,
        description: str,
        slug: str,
        properties: List[object],
        categories: List[int],
        variations: List[object],
        images: List[str],
    ):
        product = ProductService.addProduct(
            productName, description, slug, properties, categories, variations, images
        )
        return Response(200, "Success", data=product.serialize())

    # Xóa sản phẩm
    def removeProduct(slug: str):
        ProductService.removeProduct(slug)
        return Response(200, "Success")

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
        customer = CustomerService.toggleStatus(customerId)
        if customer:
            return Response(200, "Success", customer.serialize())
        else:
            return Response(404, "Customer not found")

    # Doanh thu
    def getRevenue(time: str, type: str, slug: str):
        orders = OrderService.getAllOrderHistory(time)
        if orders is None:
            return Response(404, "Orders not found")

        if type == "category":
            total_revenue, total_order, pending_order, completed_order = (
                RevenueController.calculateCategoryRevenue(orders, slug)
            )
        elif type == "product":
            total_revenue, total_order, pending_order, completed_order = (
                RevenueController.calculateProductRevenue(orders, slug)
            )
        else:
            total_revenue, total_order, pending_order, completed_order = (
                RevenueController.getTotalRevenue(orders)
            )

        totalProduct, totalCategory, totalCustomer = AdminService.getOverview()

        return Response(
            200,
            "Success",
            {
                "totalRevenue": total_revenue,
                "totalOrder": total_order,
                "pendingOrder": pending_order,
                "completedOrder": completed_order,
                "totalProduct": totalProduct,
                "totalCategory": totalCategory,
                "totalCustomer": totalCustomer,
            },
        )

    # Lấy đánh giá của tất cả sản phẩm
    def getReviews(page: int, limit: int):
        all_ratings = ReviewService.getAllReviews()

        total = len(all_ratings)
        if total == 0:
            return Response(404, "No review found")
        start = (page - 1) * limit
        end = min(start + limit, total)
        paginated_ratings = all_ratings[start:end]

        # Chuẩn bị dữ liệu trả về
        rating_data = []
        for rating in paginated_ratings:
            rating_data.append(rating.serialize())

        pagination = Pagination(
            currentPage=page, perPage=limit, total=total, data=rating_data
        )

        return Response(200, "Success", pagination.serialize())

    # Tạo sản phẩm
    def createCategory(name: str, slug: str, desc: str):
        # Kiểm tra xem có danh mục nào với slug này
        if CategoryService.getCategoryBySlug(slug):
            return Response(400, "Đã có danh mục với slug này")
        category = CategoryService.addCategory(name, slug, desc)
        return Response(200, "Tạo danh mục thành công", category.serialize())

    # Chỉnh sửa sản phẩm
    def editCategory(id: int, name: str, slug: str, desc: str):
        # Kiểm tra xem có danh mục nào với slug này
        if CategoryService.getCategoryBySlug(slug):
            return Response(400, "Đã có danh mục với slug này")
        # Lấy danh mục cần sửa kiểm tra xem danh mục đó có tồn tại không
        category = CategoryService.getCategoryById(id)
        if not category:
            return Response(404, "Danh mục không tồn tại")
        category = CategoryService.editCategory(category, name, slug, desc)
        return Response(200, "Chỉnh sửa thành công", category.serialize())
