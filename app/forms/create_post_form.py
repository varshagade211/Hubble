from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired






class PostForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    description = StringField('Description')
    type = StringField('Type', validators=[DataRequired()])
    link= StringField('link')
    image = StringField('image')
