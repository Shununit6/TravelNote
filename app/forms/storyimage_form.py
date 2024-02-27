from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class StoryImageForm(FlaskForm):
    image_url = StringField('Story Image URL', validators=[DataRequired(message='Story Image URL is required')])
    submit = SubmitField('Submit')
