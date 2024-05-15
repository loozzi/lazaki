from flask import Blueprint, request
from src.controllers.AuthController import AuthController

auth = Blueprint("auth", __name__)


@auth.route("/sign-in", methods=["POST"])
def login():
    token = request.form.get("token")
    return AuthController.login(token)
