from flask import Blueprint

from .auth_route import auth

api = Blueprint("api", __name__)

api.register_blueprint(auth, url_prefix="/auth")
