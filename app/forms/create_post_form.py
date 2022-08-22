from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class PostForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description')
    type = StringField('type', validators=[DataRequired()])
    link= StringField('link')
    image = StringField('image')
