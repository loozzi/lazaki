from src.models import Customer, Address
from src.utils.enums import CustomerStatusEnum
from datetime import datetime


class CustomerService:
    # Lấy thông tin khách hàng qua uid
    def getCustomer(uid: str):
        try:
            customer = Customer.query.filter_by(uid=uid).first()
            return customer
        except Exception as e:
            e
            return None

    # Lấy danh sách khách hàng
    def getCustomers():
        try:
            customers = Customer.query.all()
            return customers
        except Exception as e:
            e
            return None

    # Thêm khách hàng
    def createCustomer(data: dict):
        customer = Customer(
            uid=data["uid"],
            email=data["email"],
            fullName=data["name"],
            status=CustomerStatusEnum.ACTIVE,
        )
        customer.save()

    # Cập nhật thông tin khách hàng
    def update(
        customerId: int,
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
        customer = Customer.query.filter_by(id=customerId).first()
        address = Address.query.filter_by(id=customer.addressId).first()
        if not address:
            address = Address(
                phoneNumber=phoneNumber,
                province=province,
                district=district,
                ward=ward,
                street=street,
            )
            return_address = address.save()
            customer.addressId = return_address.id
            customer.update()
        else:
            if phoneNumber and address.phoneNumber != phoneNumber:
                address.phoneNumber = phoneNumber
            if province and address.province != province:
                address.province = province
            if district and address.district != district:
                address.district = district
            if ward and address.ward != ward:
                address.ward = ward
            if street and address.street != street:
                address.street = street
            return_address = address.update()
        if fullName and customer.fullName != fullName:
            customer.fullName = fullName
        if birthday and customer.fullName != birthday:
            customer.birthday = birthday
        if gender and customer.gender != gender:
            customer.gender = gender
        if email and customer.email != email:
            customer.email = email
        customer.update()
        return_customer = customer.serialize()
        return_customer["address"] = return_address.serialize()
        del return_customer["id"]
        del return_customer["status"]
        return return_customer

    # Lấy thông tin khách hàng qua id
    def getCustomerById(customerId: int):
        customer = Customer.query.filter_by(id=customerId).first()
        return_customer = customer.serialize()
        if "addressId" in return_customer:
            address = Address.query.filter_by(id=return_customer["addressId"]).first()
            return_address = address.serialize()
            return_customer["address"] = return_address
            del return_customer["addressId"]
        else:
            return_customer["address"] = None
        del return_customer["id"]
        del return_customer["status"]
        return return_customer
