from functools import wraps

from flask import request


def request_pagination(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        page = request.args.get("page", 1, type=int)
        limit = request.args.get("limit", 10, type=int)

        request.pagination = {"page": max(page, 1), "limit": max(min(limit, 100), 1)}

        return f(*args, **kwargs)

    return decorated
