from src.config.dev_config import DevConfig
from src.config.prod_config import ProdConfig


class Config:
    def __init__(self) -> None:
        self.__dev_config = DevConfig()
        self.__prod_config = ProdConfig()

    def getDevConfig(self):
        return self.__dev_config

    def getProdConfig(self):
        return self.__prod_config
