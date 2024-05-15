"""empty message

Revision ID: 50caaf16db93
Revises: 92e3888f3272
Create Date: 2024-05-15 16:52:32.434900

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '50caaf16db93'
down_revision = '92e3888f3272'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('order', schema=None) as batch_op:
        batch_op.drop_column('status')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('order', schema=None) as batch_op:
        batch_op.add_column(sa.Column('status', mysql.ENUM('PAID', 'UNPAID'), nullable=False))

    # ### end Alembic commands ###
