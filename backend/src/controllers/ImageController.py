from src.services.ImageService import ImageService
from src.utils.response import Response


class ImageController:
    def __init__(self):
        self.image_service = ImageService()

    def add_image(self, file: object):
        data = self.image_service.add_image(file)
        if not data:
            return Response(
                500,
                "Internal server error",
            )

        return Response(
            200,
            "Image added successfully",
            data,
        )
