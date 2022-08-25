from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin



follows = db.Table(
    "follows",
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("following_id", db.Integer, db.ForeignKey("users.id"))
)



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_image = db.Column(db.String(1000))
    # relationships
    #change in profile

    posts = db.relationship('Post', back_populates='user',cascade='all, delete')

    notes = db.relationship('Note', back_populates='user',cascade='all, delete')

    user_likes = db.relationship(
        "Post",
        secondary="likes",
        back_populates="posts_likes",
        cascade='all, delete'
    )

    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.following_id == id),
        backref=db.backref("following", lazy="dynamic"),
        lazy="dynamic"
    )


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profileImage':self.profile_image,
            'posts': self.posts.to_dict()
        }

   


    def to_dict_get_followings(self):
        # print('.....', self.following.all()[0].to_dict())
        return {

            'followings': [x.to_dict() for x in self.following.all()]

        }


    def to_dict_get_followers(self):
        # print('.....', self.followers.all()[0].to_dict())
        return {

            'followers': [x.to_dict() for x in self.followers.all()]

        }


    def to_dict_get_likes(self):
        # print('.....', self.user_likes)
        return {
            'likes': [post.to_dict() for post in self.user_likes]
        }
