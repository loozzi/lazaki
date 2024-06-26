from src.models import Category


class CategoryService:
    # Tạo danh mục
    def addCategory(name: str, slug: str, desc: str) -> Category:
        category = Category(name=name, slug=slug, description=desc)
        category.save()
        return category

    # Trả về danh mục theo id
    def getCategoryById(id: int):
        category = Category.query.filter_by(id=id).first()
        if category is None:
            return None
        return category

    # Trả về danh mục theo slug
    def getCategoryBySlug(slug: str):
        category = Category.query.filter_by(slug=slug).first()
        if category is None:
            return None
        return category

    # Chỉnh sửa danh mục
    def editCategory(category: Category, name: str, slug: str, desc: str):
        category.name = name
        category.slug = slug
        category.description = desc
        category.update()
        return category

    def get_categories():
        categories = Category.query.filter(Category.isDeleted == False).all()
        data = []
        for category in categories:
            data.append(category.serialize())
        return data
