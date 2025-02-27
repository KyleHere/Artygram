from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Comment(db.Model):
    __tablename__ = "comments"
    if environment == "production":
        __table_args__ = {"schema": SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    caption = db.Column(db.String(255), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    timestamp = db.Column(db.DateTime, default=datetime.now)

    users = db.relationship("User", back_populates="comments")

    posts = db.relationship("Post", back_populates="comments")


def to_dict(self):
    return {
        "id": self.id,
        "caption": self.comment,
        "postId": self.postId,
        "userId": self.userId,
        "timestamp": self.timestamp,
    }
