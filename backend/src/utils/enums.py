from enum import Enum


class GenderEnum(Enum):
    MALE = "male"
    FEMALE = "female"


class CustomerStatusEnum(Enum):
    ACTIVE = "active"
    DEACTIVE = "deactive"


class PaymentMethodEnum(Enum):
    COD = "cod"
    BANKING = "banking"


class PaymentStatusEnum(Enum):
    PAID = "paid"
    UNPAID = "unpaid"


class OrderStatusEnum(Enum):
    SUCCESS = "success"
    ORDER = "order"
    CANCEL = "cancel"
    SHIPPING = "shipping"
    PREPARING = "preparing"
