from flask import Blueprint
from src.controllers.CategoryController import CategoryController
from src.middlewares.PaginationMiddleware import request_pagination

category = Blueprint("category", __name__)


@category.route("/all", methods=["GET"])
@request_pagination
def get_categories():
    return CategoryController.get_categories()
