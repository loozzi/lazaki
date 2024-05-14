"""modify table customer

Revision ID: d8bc71aac8f7
Revises: e93ea00c01a7
Create Date: 2024-05-14 16:35:18.381812

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd8bc71aac8f7'
down_revision = 'e93ea00c01a7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('customer', schema=None) as batch_op:
        batch_op.add_column(sa.Column('uid', sa.String(length=256), nullable=False))
        batch_op.drop_index('email')
        batch_op.create_unique_constraint(None, ['uid'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('customer', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.create_index('email', ['email'], unique=True)
        batch_op.drop_column('uid')

    # ### end Alembic commands ###