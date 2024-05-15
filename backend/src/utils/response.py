def Response(status, message, data=None, error=None):
    return {"status": status, "message": message, "data": data, "error": error}
