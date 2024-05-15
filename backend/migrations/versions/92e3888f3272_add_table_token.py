"""add table token

Revision ID: 92e3888f3272
Revises: 3b528a44b589
Create Date: 2024-05-14 23:51:25.251617

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '92e3888f3272'
down_revision = '3b528a44b589'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('token',
    sa.Column('uid', sa.String(length=512), nullable=False),
    sa.Column('token', sa.String(length=512), nullable=False),
    sa.Column('isDeleted', sa.Boolean(), nullable=False),
    sa.Column('createdAt', sa.TIMESTAMP(timezone=True), nullable=False),
    sa.Column('updatedAt', sa.TIMESTAMP(timezone=True), nullable=False),
    sa.PrimaryKeyConstraint('uid'),
    sa.UniqueConstraint('uid')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('token')
    # ### end Alembic commands ###