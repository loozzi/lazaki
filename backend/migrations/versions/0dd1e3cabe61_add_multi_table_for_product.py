"""add multi table for product

Revision ID: 0dd1e3cabe61
Revises: ad10b740de1d
Create Date: 2024-05-12 14:34:28.470796

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '0dd1e3cabe61'
down_revision = 'ad10b740de1d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('category',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(length=256), nullable=False),
    sa.Column('slug', sa.String(length=256), nullable=False),
    sa.Column('description', sa.String(length=256), nullable=True),
    sa.Column('isDeleted', sa.Boolean(), nullable=False),
    sa.Column('createdAt', sa.TIMESTAMP(timezone=True), nullable=False),
    sa.Column('updatedAt', sa.TIMESTAMP(timezone=True), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('slug')
    )
    op.create_table('product',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(length=1024), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('isDeleted', sa.Boolean(), nullable=False),
    sa.Column('createdAt', sa.TIMESTAMP(timezone=True), nullable=False),
    sa.Column('updatedAt', sa.TIMESTAMP(timezone=True), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('product_image',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('isPrimary', sa.Boolean(), nullable=False),
    sa.Column('link', sa.String(length=1024), nullable=False),
    sa.Column('isDeleted', sa.Boolean(), nullable=False),
    sa.Column('createdAt', sa.TIMESTAMP(timezone=True), nullable=False),
    sa.Column('updatedAt', sa.TIMESTAMP(timezone=True), nullable=False),
    sa.ForeignKeyConstraint(['product_id'], ['product.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('product_property',
    sa.Column('productId', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('value', sa.String(length=1024), nullable=False),
    sa.Column('isDeleted', sa.Boolean(), nullable=False),
    sa.Column('createdAt', sa.TIMESTAMP(timezone=True), nullable=False),
    sa.Column('updatedAt', sa.TIMESTAMP(timezone=True), nullable=False),
    sa.ForeignKeyConstraint(['productId'], ['product.id'], ),
    sa.PrimaryKeyConstraint('productId', 'name')
    )
    op.create_table('variation',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('productId', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(length=255), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('option', sa.String(length=1024), nullable=False),
    sa.Column('image', sa.String(length=1024), nullable=True),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.Column('oldPrice', sa.Integer(), nullable=True),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('sold', sa.Integer(), nullable=False),
    sa.Column('isDeleted', sa.Boolean(), nullable=False),
    sa.Column('createdAt', sa.TIMESTAMP(timezone=True), nullable=False),
    sa.Column('updatedAt', sa.TIMESTAMP(timezone=True), nullable=False),
    sa.ForeignKeyConstraint(['productId'], ['product.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('rating',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('customerId', sa.Integer(), nullable=False),
    sa.Column('productId', sa.Integer(), nullable=False),
    sa.Column('variationId', sa.Integer(), nullable=True),
    sa.Column('value', sa.Integer(), nullable=False),
    sa.Column('content', sa.String(length=1024), nullable=True),
    sa.Column('isDeleted', sa.Boolean(), nullable=False),
    sa.Column('createdAt', sa.TIMESTAMP(timezone=True), nullable=False),
    sa.Column('updatedAt', sa.TIMESTAMP(timezone=True), nullable=False),
    sa.ForeignKeyConstraint(['customerId'], ['customer.id'], ),
    sa.ForeignKeyConstraint(['productId'], ['product.id'], ),
    sa.ForeignKeyConstraint(['variationId'], ['variation.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('rating_image',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('rating_id', sa.Integer(), nullable=False),
    sa.Column('link', sa.String(length=1024), nullable=False),
    sa.Column('isDeleted', sa.Boolean(), nullable=False),
    sa.Column('createdAt', sa.TIMESTAMP(timezone=True), nullable=False),
    sa.Column('updatedAt', sa.TIMESTAMP(timezone=True), nullable=False),
    sa.ForeignKeyConstraint(['rating_id'], ['rating.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('customer', schema=None) as batch_op:
        batch_op.add_column(sa.Column('addressId', sa.Integer(), nullable=True))
        batch_op.drop_constraint('customer_ibfk_1', type_='foreignkey')
        batch_op.create_foreign_key(None, 'address', ['addressId'], ['id'])
        batch_op.drop_column('address_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('customer', schema=None) as batch_op:
        batch_op.add_column(sa.Column('address_id', mysql.INTEGER(), autoincrement=False, nullable=True))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('customer_ibfk_1', 'address', ['address_id'], ['id'])
        batch_op.drop_column('addressId')

    op.drop_table('rating_image')
    op.drop_table('rating')
    op.drop_table('variation')
    op.drop_table('product_property')
    op.drop_table('product_image')
    op.drop_table('product')
    op.drop_table('category')
    # ### end Alembic commands ###
