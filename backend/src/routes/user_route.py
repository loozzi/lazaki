from datetime import datetime

from flask import Blueprint, request
from src.controllers.AuthController import AuthController
from src.middlewares.AuthMiddleware import customer_middleware
from src.utils.enums import GenderEnum
from src.utils.response import Response

user = Blueprint("user", __name__)


@user.route("/", methods=["GET"])
@customer_middleware
def getInformation():
    return AuthController.getInformation()


@user.route("/", methods=["PUT"])
@customer_middleware
def updateInformation():
    fullName = request.form.get("fullName", "")
    birthday = request.form.get("birthday", type=str)
    if birthday:
        try:
            birthday = datetime.strptime(birthday, "%d/%m/%Y")
        except ValueError:
            return Response(400, 'Ngày sinh không đúng định dạng "%d/%m/%Y" ')
    gender = request.form.get("gender", "")
    if gender.lower() not in [gender.value for gender in GenderEnum]:
        return Response(400, "Giới tính không hợp lệ")
    email = request.form.get("email", "")
    phoneNumber = request.form.get("phoneNumber", "")
    province = request.form.get("province", "")
    district = request.form.get("district", "")
    ward = request.form.get("ward", "")
    street = request.form.get("street", "")
    return AuthController.updateInformation(
        fullName, birthday, gender, email, phoneNumber, province, district, ward, street
    )
