from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField
from wtforms.validators import DataRequired

class PlaceForm(FlaskForm):
    name = StringField('Place Name', validators=[DataRequired(message='Place Name is required')])
    type = StringField('Place Type', validators=[DataRequired(message='Place Type is required')])
    description = StringField('Place Description', validators=[DataRequired(message='Place Description is required')])
    submit = SubmitField('Submit')
