from src.services.AuthService import AuthService
from src.services.CustomerService import CustomerService
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
        return Response(
            200, "Success", {"accessToken": accessToken, "refreshToken": refreshToken}
        )

    # Refresh token
    def refeshToken(refreshToken: str):
        pass
