from flask import Blueprint, request
from src.controllers.ImageController import ImageController
from src.utils.response import Response

image = Blueprint("image", __name__)


@image.route("/add", methods=["POST"])
def add_image():
    file = request.files.get("image")
    if not file:
        return Response(
            400,
            "Image not found",
        )

    return ImageController().add_image(file)
