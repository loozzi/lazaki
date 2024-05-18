from functools import wraps

from flask import request
from src.services import AdminService
from src.services.CustomerService import CustomerService
from src.services.TokenService import TokenService
from src.utils.response import Response


def customer_middleware(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return Response(401, "Unauthorized")

        token = token.split(" ")[1]
        data = TokenService.verify(token)
        if not data:
            return Response(400, "Invalid token(data not found)")

        if data["isRefreshToken"]:
            return Response(400, "Invalid token(refresh-token)")

        customer = CustomerService.getCustomer(data["uid"])
        if not customer:
            return Response(400, "Invalid token(uid)")

        request.customer = customer
        return f(*args, **kwargs)

    return decorated


def admin_middleware(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return Response(401, "Unauthorized")

        token = token.split(" ")[1]
        data = AdminService.verify(token)
        if not data:
            return Response(400, "Invalid token")

        request.admin = data
        return f(*args, **kwargs)

    return decorated
