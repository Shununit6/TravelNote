from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("user.id")), nullable=False)
    story_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("story.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship('User', back_populates='like')
    story = db.relationship('Story', back_populates = 'like')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'story_id': self.story_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
