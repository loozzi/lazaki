import requests


class ImageService:
    def __init__(self) -> None:
        self.headers = {"Authorization": "Client-ID 3ec457715d562c5"}

    def add_image(self, file: object):
        resposne = requests.post(
            "https://api.imgur.com/3/image", files={"image": file}, headers=self.headers
        )

        if resposne.status_code != 200:
            return None

        return resposne.json()["data"]
