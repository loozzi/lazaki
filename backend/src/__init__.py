from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from src.config import _config, envConfig
from src.models import *
from src.utils import api

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = envConfig.SQLALCHEMY_DATABASE_URI

db = SQLAlchemy(app)

migrate = Migrate(app, db)

config = _config.getDevConfig()
app.env = config.ENV

app.register_blueprint(api, url_prefix="/api")
