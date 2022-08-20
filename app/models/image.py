from .db import db

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(200), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)


    post = db.relationship('Post', back_populates='image')

    def to_dict(self):
        return {
            'id': self.id,
            'post_id': self.post_id,
            'url': self.url,
        }
