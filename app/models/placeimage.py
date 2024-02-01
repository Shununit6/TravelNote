from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Placeimage(db.Model):
    __tablename__ = 'placeimages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    place_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("place.id")), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    place = db.relationship('Place', back_populates = 'places')


    def to_dict(self):
        return {
            'id': self.id,
            'place_id': self.place_id,
            "image_url": self.image_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
