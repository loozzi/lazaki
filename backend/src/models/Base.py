import datetime

from sqlalchemy import TIMESTAMP, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func
from src import db


class Base(db.Model):
    __abstract__ = True
    isDeleted: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    createdAt: Mapped[datetime.datetime] = mapped_column(
        TIMESTAMP(timezone=True), default=func.current_timestamp()
    )
    updatedAt: Mapped[datetime.datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        onupdate=func.current_timestamp(),
        default=func.current_timestamp(),
    )
