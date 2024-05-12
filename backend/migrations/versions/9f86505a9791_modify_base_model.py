"""modify base model

Revision ID: 9f86505a9791
Revises: 0f236fcc1442
Create Date: 2024-05-12 11:07:51.867173

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '9f86505a9791'
down_revision = '0f236fcc1442'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('address', schema=None) as batch_op:
        batch_op.add_column(sa.Column('createdAt', sa.TIMESTAMP(timezone=True), nullable=False))
        batch_op.add_column(sa.Column('updatedAt', sa.TIMESTAMP(timezone=True), nullable=False))
        batch_op.drop_column('created_at')
        batch_op.drop_column('updated_at')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('address', schema=None) as batch_op:
        batch_op.add_column(sa.Column('updated_at', mysql.TIMESTAMP(), nullable=False))
        batch_op.add_column(sa.Column('created_at', mysql.TIMESTAMP(), nullable=False))
        batch_op.drop_column('updatedAt')
        batch_op.drop_column('createdAt')

    # ### end Alembic commands ###
