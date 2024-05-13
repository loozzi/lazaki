"""add table customer

Revision ID: fac2c4797cd4
Revises: 9f86505a9791
Create Date: 2024-05-12 11:27:22.121687

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fac2c4797cd4'
down_revision = '9f86505a9791'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('customer',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('email', sa.String(length=256), nullable=False),
    sa.Column('status', sa.Enum('ACTIVE', 'DEACTIVE', name='customerstatusenum'), nullable=False),
    sa.Column('fullName', sa.String(length=256), nullable=True),
    sa.Column('birthday', sa.DateTime(), nullable=True),
    sa.Column('gender', sa.Enum('MALE', 'FEMALE', name='genderenum'), nullable=True),
    sa.Column('address_id', sa.Integer(), nullable=True),
    sa.Column('isDeleted', sa.Boolean(), nullable=False),
    sa.Column('createdAt', sa.TIMESTAMP(timezone=True), nullable=False),
    sa.Column('updatedAt', sa.TIMESTAMP(timezone=True), nullable=False),
    sa.ForeignKeyConstraint(['address_id'], ['address.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('customer')
    # ### end Alembic commands ###