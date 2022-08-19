from .db import db

class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)

    description = db.Column(db.Text)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)

    user = db.relationship('User', back_populates='notes')
    post = db.relationship('Post', back_populates='notes')

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'post_id ': self.post_id,
            'user_id': self.user_id,
        }


