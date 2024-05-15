from flask import Blueprint

from .admin_route import admin
from .auth_route import auth
from .category_route import category
from .order_route import order
from .payment_route import payment
from .product_route import product
from .user_route import user

api = Blueprint("api", __name__)

api.register_blueprint(admin, url_prefix="/admin")
api.register_blueprint(auth, url_prefix="/auth")
api.register_blueprint(category, url_prefix="/category")
api.register_blueprint(order, url_prefix="/order")
api.register_blueprint(payment, url_prefix="/payment")
api.register_blueprint(product, url_prefix="/product")
api.register_blueprint(user, url_prefix="/user")
