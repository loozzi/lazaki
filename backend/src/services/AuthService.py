import google.oauth2.id_token
from google.auth.transport import requests
from datetime import datetime
from src.models import Customer, Address
from src.utils.response import Response
from src import db

firebase_request_adapter = requests.Request()


class AuthService:
    # Xác thực token
    def verify(token: str):
        claims = google.oauth2.id_token.verify_firebase_token(
            token, firebase_request_adapter
        )
        if not claims:
            return None
        return claims

    def getInformation(user):
        customer = Customer.query.filter_by(id=user.id).first()
        if not customer:
            return Response(404, "Người dùng không tồn tại")
        return_customer = customer.serialize()
        return_customer["address"] = return_customer["address"].serialize()
        del return_customer["id"]
        del return_customer["uid"]
        del return_customer["status"]
        del return_customer["addressId"]
        return Response(200, "Truy xuất thành công", return_customer)

    def updateInformation(
        user,
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
        customer = Customer.query.filter_by(id=user.id).first()
        if not customer:
            return Response(404, "Người dùng không tồn tại")
        address = Address.query.filter_by(id=customer.addressId).first()
        if fullName & customer.fullName != fullName:
            customer.fullName = fullName
        if birthday & customer.fullName != birthday:
            customer.birthday = birthday
        if gender & customer.gender != gender:
            customer.gender = gender
        if email & customer.email != email:
            customer.email = email
        if phoneNumber & address.phoneNumber != phoneNumber:
            address.phoneNumber = phoneNumber
        if province & address.province != province:
            address.province = province
        if district & address.district != district:
            address.district = district
        if ward & address.ward != ward:
            address.ward = ward
        if street & address.street != street:
            address.street = street
        db.session.commit()
        return_customer = customer.serialize()
        return_customer["address"] = return_customer["address"].serialize()
        del return_customer["id"]
        del return_customer["uid"]
        del return_customer["status"]
        del return_customer["addressId"]
        return Response(200, "Cập nhật thành công", return_customer)
