from src.models import Category


class CategoryService:
    # Tạo danh mục
    def addCategory(name: str, slug: str, desc: str) -> Category:
        category = Category(name=name, slug=slug, description=desc)
        category.save()
        return category

    # Trả về danh mục theo id
    def getCategoryById(id) -> Category:
        category = Category.query.filter_by(id=id).first()
        return category

    # Chỉnh sửa danh mục
    def editCategory(category: Category, name: str, slug: str, desc: str):
        category.name = name
        category.slug = slug
        category.description = desc
        category.update()
        return category
