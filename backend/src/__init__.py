from dotenv import load_dotenv
from flask import Flask
from src.config import _config

load_dotenv()

app = Flask(__name__)

config = _config.getDevConfig()
app.env = config.ENV
