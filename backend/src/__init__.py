from flask import Flask, request
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from src.config import _config, envConfig

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config["SQLALCHEMY_DATABASE_URI"] = envConfig.SQLALCHEMY_DATABASE_URI

db = SQLAlchemy(app)

migrate = Migrate(app, db)

config = _config.getDevConfig()

app.env = config.ENV

bcrypt = Bcrypt(app)

from src.middlewares.LoggerMiddleware import logger_middeware
from src.models import *
from src.routes import api

app.register_blueprint(api, url_prefix="/api")


@app.before_request
def before_request():
    logger_middeware()
