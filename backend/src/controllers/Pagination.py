from functools import wraps
from typing import List

from flask import request


class Pagination:
    def __init__(self, currentPage: int, perPage: int, total: int, data: List):
        self.currentPage = currentPage
        self.perPage = perPage
        self.total = total
        self.data = data

    def serialize(self):
        return {
            "currentPage": self.currentPage,
            "perPage": self.perPage,
            "total": self.total,
            "data": self.data,
        }


def request_pagination(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        page = request.args.get("page", 1, type=int)
        limit = request.args.get("limit", 10, type=int)
        request.pagination = {"page": max(page, 1), "limit": max(limit, 10)}

        return f(*args, **kwargs)

    return decorated
