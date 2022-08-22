from .db import db



like = db.Table(
    "likes",
    db.Column("post_id", db.Integer, db.ForeignKey("posts.id")),
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"))
)


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50),nullable=False)
    description = db.Column(db.Text)
    type = db.Column(db.String(50),nullable=False)
    link = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='posts')
    # likes = db.relationship('Like', back_populates='post',cascade='all, delete')
    notes = db.relationship('Note', back_populates='post',cascade='all, delete')
    image = db.relationship('Image', back_populates='post',cascade='all, delete', uselist=False)


    posts_likes = db.relationship(
        "User",
        secondary="likes",
        back_populates="user_likes"
    )


    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'type': self.type,
            'link': self.link,
            'user':self.user.to_dict(),
            'image': self.image.to_dict() if self.image is not None else {}
        }
