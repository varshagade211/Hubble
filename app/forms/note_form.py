from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField, TextAreaField
from wtforms.validators import DataRequired


class NoteForm(FlaskForm):

    description = TextAreaField("Description", validators=[DataRequired(message="Description is required")])

    # user_id = IntegerField("UserId", validators=[DataRequired()])
    # post_id = IntegerField("PostId", validators=[DataRequired()])

    submit = SubmitField("Submit")
