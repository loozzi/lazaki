from src.services.AuthService import AuthService
from src.services.CustomerService import CustomerService
from src.services.OrderService import OrderService
from src.services.TokenService import TokenService
from src.utils.response import Response
from datetime import datetime
from flask import request


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
            cart = OrderService.getCart(customer.id)

        return Response(
            200,
            "Success",
            {
                "accessToken": accessToken,
                "refreshToken": refreshToken,
                "cart": cart.serialize(),
            },
        )

    # Refresh token
    def refeshToken(refreshToken: str):
        pass

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
        curr_user = request.user
        return AuthService.updateInformation(
            curr_user,
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
