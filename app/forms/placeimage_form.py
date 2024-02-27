from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class PlaceImageForm(FlaskForm):
    image_url = StringField('Place Image URL', validators=[DataRequired(message='Place Image URL is required')])
    submit = SubmitField('Submit')
