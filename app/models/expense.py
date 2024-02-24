from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Expense(db.Model):
    __tablename__ = 'expenses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    plan_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("plans.id")), nullable=False)
    name = db.Column(db.String(40), nullable=False)
    category = db.Column(db.String(40), nullable=False, default='Other')
    amount = db.Column(db.Integer, nullable=False)
    split = db.Column(db.Boolean, nullable=False, default=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    plan = db.relationship('Plan', back_populates='expense')


    def to_dict(self):
        return {
            'id': self.id,
            'plan_id': self.plan_id,
            'name': self.name,
            'category': self.category,
            'amount': self.amount,
            'split': self.split,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
