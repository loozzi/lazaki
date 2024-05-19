from datetime import datetime

from flask import request
from src.services.AuthService import AuthService
from src.services.CustomerService import CustomerService
from src.services.OrderService import OrderService
from src.services.TokenService import TokenService
from src.utils.response import Response


class AuthController:
    # Đăng nhập với Google
    def login(token: str):
        claims = AuthService.verify(token)
        if not claims:
            return Response(400, "Invalid token")

        # Kiểm tra xem email đã được đăng ký chưa
        customer = CustomerService.getCustomer(claims["user_id"])
        if not customer:
            # Nếu chưa đăng ký thì tạo mới
            data = {
                "uid": claims["user_id"],
                "email": claims["email"],
                "name": claims["name"],
            }
            CustomerService.createCustomer(data)
            customer = CustomerService.getCustomer(claims["user_id"])

        accessToken, refreshToken = TokenService.generate(customer)

        cart = OrderService.getCart(customer.id)
        if not cart:
            OrderService.createCart(customer.id)

        return Response(
            200,
            "Success",
            {
                "accessToken": accessToken,
                "refreshToken": refreshToken,
            },
        )

    # Refresh token
    def refeshToken(refreshToken: str):
        data = TokenService.verify(refreshToken, isRefreshToken=True)
        if not data:
            return Response(400, "Invalid token")

        if data.get("isRefreshToken"):
            customer = CustomerService.getCustomer(data["uid"])
            if not customer:
                return Response(400, "Invalid token")

            accessToken, refreshToken = TokenService.generate(customer)
            return Response(
                200,
                "Success",
                {
                    "accessToken": accessToken,
                    "refreshToken": refreshToken,
                },
            )

    def login_admin(username: str, password: str):
        admin = AuthService.verifyAdmin(username, password)

        if admin:
            accessToken = TokenService.generate(admin, type="admin")
            return Response(200, "Success", {"accessToken": accessToken})

        return Response(400, "Invalid username or password")

    def getInformation():
        customer = request.customer
        return_customer = CustomerService.getCustomerById(customer.id)
        return Response(200, "Truy xuất thành công", return_customer)

    def updateInformation(
        fullName: str,
        birthday: datetime,
        gender: str,
        email: str,
        phoneNumber: str,
        province: str,
        district: str,
        ward: str,
        street: str,
    ):
        customer = request.customer
        updated_customer = CustomerService.update(
            customer.id,
            fullName,
            birthday,
            gender,
            email,
            phoneNumber,
            province,
            district,
            ward,
            street,
        )
        return Response(200, "Cập nhật thành công", updated_customer)
