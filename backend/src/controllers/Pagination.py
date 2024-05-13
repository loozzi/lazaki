from typing import List


class Pagination:
    def __init__(self, currentPage: int, perPage: int, total: int, data: List):
        self.currentPage = currentPage
        self.perPage = perPage
        self.total = total
        self.data = data
