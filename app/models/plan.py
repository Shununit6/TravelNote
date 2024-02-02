from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Plan(db.Model):
    __tablename__ = 'plans'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(40), nullable=False)
    number_traveler = db.Column(db.Integer, nullable=False, default=1)
    private = db.Column(db.Boolean, nullable=False, default=True)
    city = db.Column(db.String(40), nullable=False)
    country = db.Column(db.String(40), nullable=False)
    start_date = db.Column(db.DateTime, default=datetime.now)
    end_date = db.Column(db.DateTime, default=start_date)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship('User', back_populates='plan')
    expense = db.relationship("Expense", back_populates="plan")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'number_traveler': self.number_traveler,
            'private': self.private,
            'city': self.city,
            'country': self.country,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
