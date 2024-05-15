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

    def delete(self):
        self.isDeleted = True
        db.session.commit()
        return self

    def save(self):
        db.session.add(self)
        db.session.commit()
        return self

    def update(self):
        db.session.commit()
        return self
