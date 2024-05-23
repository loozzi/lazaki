from flask import Blueprint, json, request
from src.controllers.AdminController import AdminController
from src.controllers.OrderController import OrderController
from src.middlewares.AuthMiddleware import admin_middleware
from src.middlewares.PaginationMiddleware import request_pagination
from src.utils.response import Response

admin = Blueprint("admin", __name__)


@admin.route("/user", methods=["GET"])
@admin_middleware
@request_pagination
def getCustomers():
    page = request.pagination.get("page")
    limit = request.pagination.get("limit")
    sort = request.args.get("sort", "id")
    return AdminController.getCustomers(page, limit, sort)


@admin.route("/user", methods=["PUT"])
@admin_middleware
def editUser():
    customer_id = request.form.get("id", None)
    if customer_id is None:
        return Response(400, "customerId is required")
    return AdminController.editCustomer(customer_id)


@admin.route("/product", methods=["PUT"])
@admin_middleware
def editProduct():
    try:
        product_id = int(request.form.get("productId", None))
    except Exception:
        return Response(400, "productId is required")
    product_name = request.form.get("productName", None)
    slug = request.form.get("slug", None)
    description = request.form.get("description", None)
    try:
        properties_str = request.form.get("properties", "[]")
        add_variations_str = request.form.get("addVariations", "[]")
        remove_variations_str = request.form.get("removeVariations", "[]")
        edit_variations_str = request.form.get("editVariations", "[]")
        images_str = request.form.get("images", "[]")
        categories_str = request.form.get("categories", "[]")

        properties = json.loads(properties_str)
        add_variations = json.loads(add_variations_str)
        edit_variations = json.loads(edit_variations_str)
        images = json.loads(images_str)

        categories = eval(categories_str)
        remove_variations = eval(remove_variations_str)
    except Exception:
        return Response(400, "Invalid format")
    return AdminController.editProduct(
        product_id,
        product_name,
        slug,
        description,
        properties,
        add_variations,
        remove_variations,
        edit_variations,
        images,
        categories,
    )


@admin.route("/product", methods=["POST"])
@admin_middleware
def addProduct():
    product_name = request.form.get("productName", None)
    slug = request.form.get("slug", None)
    description = request.form.get("description", None)

    # Kiểm tra các trường bắt buộc
    if not product_name or not slug:
        return Response(400, "productName and slug are required")

    # Kiểm tra các trường bắt buộc
    if not product_name or not slug:
        return Response(400, "productName and slug are required")

    try:
        properties_str = request.form.get("properties", "[]")
        categories_str = request.form.get("categories", "[]")
        variations_str = request.form.get("variations", "[]")
        images_str = request.form.get("images", "[]")

        # Sử dụng json.loads để chuyển đổi chuỗi JSON thành đối tượng Python
        properties = json.loads(properties_str)
        categories = json.loads(categories_str)
        variations = json.loads(variations_str)
        images = json.loads(images_str)
    except Exception:
        return Response(400, "Invalid format")

    return AdminController.addProduct(
        product_name, description, slug, properties, categories, variations, images
    )


@admin.route("/product/<string:slug>", methods=["DELETE"])
@admin_middleware
def removeProduct(slug):
    return AdminController.removeProduct(slug)


@admin.route("/overview", methods=["GET"])
@admin_middleware
def getOverview():
    type = request.args.get("type", None)
    time = request.args.get("time", None)
    slug = request.args.get("slug", None)
    if type not in ["all", "category", "product"]:
        return Response(400, "Invalid type")
    if time not in ["week", "month"]:
        return Response(400, "Invalid time")
    return AdminController.getRevenue(time, type, slug)


@admin.route("/review", methods=["GET"])
@admin_middleware
@request_pagination
def getReviews():
    page = request.pagination.get("page")
    limit = request.pagination.get("limit")
    return AdminController.getReviews(page, limit)


@admin.route("/product", methods=["GET"])
@admin_middleware
@request_pagination
def getProducts():
    page = request.pagination.get("page")
    limit = request.pagination.get("limit")
    keyword = request.args.get("keyword", None)
    order = request.args.get("order", None)
    type = request.args.get("type", None)
    category = request.args.get("category", None)
    return AdminController.getProducts(page, limit, keyword, order, type, category)


@admin.route("/category", methods=["POST"])
@admin_middleware
def createCategory():
    name = request.form.get("name", "")
    slug = request.form.get("slug", "")
    description = request.form.get("description", "")
    if not name or not slug:
        return Response(400, "Vui lòng điền đủ thông tin")
    return AdminController.createCategory(name, slug, description)


@admin.route("/category", methods=["PUT"])
@admin_middleware
def editCategory():
    id = request.form.get("id", "")
    name = request.form.get("name", "")
    slug = request.form.get("slug", "")
    description = request.form.get("description", "")
    if not name or not slug or not description or not id:
        return Response(400, "Vui lòng điền đủ thông tin")
    return AdminController.editCategory(id, name, slug, description)


@admin.route("/category/<string:slug>", methods=["DELETE"])
@admin_middleware
def deleteCategory(slug):
    return AdminController.deleteCategory(slug)


@admin.route("/order", methods=["GET"])
@admin_middleware
@request_pagination
def getOrders():
    sort = request.args.get("sort", "")
    limit = request.pagination.get("limit")
    page = request.pagination.get("page")
    return AdminController.getOrders(page, limit, sort)


@admin.route("/order/<int:orderId>", methods=["GET"])
@admin_middleware
def getOrderDetail(orderId):
    return OrderController.getDetailOrder(orderId)


@admin.route("/order", methods=["PUT"])
@admin_middleware
def editOrder():
    try:
        orderId = int(request.form.get("orderId", ""))
    except TypeError:
        return Response(400, "Mã đơn hàng không hợp lệ")
    type = request.args.get("type", "")
    if type == "status":
        status = request.form.get("status")
        return AdminController.updateOrderStatus(orderId, status)
    if type == "shipping":
        name = request.form.get("shippingName")
        code = request.form.get("shippingCode")
        return AdminController.updateOrderShipping(orderId, name, code)
    if type == "paymentStatus":
        paymentStatus = request.form.get("paymentStatus")
        return AdminController.updateOrderPayment(orderId, paymentStatus)
    return Response(400, "type chỉ chấp nhận status, shipping và paymentStatus")
