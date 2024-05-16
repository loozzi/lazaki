from flask import Blueprint, request
from src.middlewares.AuthMiddleware import customer_middleware
from src.utils.response import Response
from src.controllers.AuthController import AuthController
from datetime import datetime, timezone

user = Blueprint("user", __name__)


@user.route("/", methods=["GET"])
@customer_middleware
def updateUserInfo():
    fullName = request.form.get("fullName", "")
    birthday = request.form.get("birthday")
    if birthday:
        try:
            birthday = datetime.strptime(birthday, format="%d/%m/%Y")
        except ValueError:
            return Response(400, 'Ngày sinh không đúng định dạng "%d/%m/%Y" ')
    gender = request.form.get("gender", "")
    email = request.form.get("email", "")
    phoneNumber = request.form.get("phoneNumber", "")
    province = request.form.get("province", "")
    district = request.form.get("district", "")
    ward = request.form.get("ward", "")
    street = request.form.get("street", "")
    return AuthController.updateInformation(
        fullName, birthday, gender, email, phoneNumber, province, district, ward, street
    )
