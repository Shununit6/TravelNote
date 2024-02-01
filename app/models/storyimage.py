from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Storyimage(db.Model):
    __tablename__ = 'storyimages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    story_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("story.id")), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    story = db.relationship('Story', back_populates = 'storyimages')


    def to_dict(self):
        return {
            'id': self.id,
            'story_id': self.story_id,
            "image_url": self.image_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
