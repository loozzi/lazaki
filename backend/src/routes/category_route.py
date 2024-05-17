from flask import Blueprint
from flask import request
from src.middlewares.PaginationMiddleware import request_pagination
from src.models.Category import Category
category = Blueprint("category", __name__)


@category.route("/all", methods=["GET"])
@request_pagination
def get_categories():
    categories = Category.query.filter(Category.isDeleted == False).all()
    data = []
    for category in categories:
        data.append(category.serialize())
    return data