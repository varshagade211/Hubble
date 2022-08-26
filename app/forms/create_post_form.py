from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class PostForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(message="Title is required")])
    description = StringField('description',validators=[DataRequired(message="Description is required")])
    type = StringField('type', validators=[DataRequired(message="Type is required")])
    link= StringField('link')
    image = StringField('image')
