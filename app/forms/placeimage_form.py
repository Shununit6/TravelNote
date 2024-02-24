from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class PlaceImageForm(FlaskForm):
    img_url = StringField('Place Image', validators=[DataRequired(message='Place Image is required')])
    submit = SubmitField('Submit')
