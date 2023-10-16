from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

likes = db.Table(
    "likes",
    db.Model.metadata,
    db.Column("userId", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))),
    db.Column("postId", db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id"))),
    db.Column("timestamp", db.DateTime, default=datetime.now)

)

if environment == "production":
    <instance_variable>.schema = SCHEMA
