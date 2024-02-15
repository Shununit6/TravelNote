from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Place(db.Model):
    __tablename__ = 'places'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(40), nullable=False)
    type = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(260000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship('User', back_populates='place')

    placeimage = db.relationship('Placeimage', cascade = "all,delete-orphan", back_populates='place')
    story = db.relationship('Story', cascade = "all,delete-orphan", back_populates='place')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'type': self.type,
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
