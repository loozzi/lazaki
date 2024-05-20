from src.services.CategoryService import CategoryService
from src.utils.response import Response


class CategoryController:
    def get_categories():
        categories = CategoryService.get_categories()
        return Response(200, "Get categories successfully", categories)
