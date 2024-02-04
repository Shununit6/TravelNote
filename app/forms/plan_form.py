from flask_wtf import FlaskForm
from wtforms import BooleanField, IntegerField, StringField, DateField, SubmitField
from wtforms.validators import DataRequired

class PlanForm(FlaskForm):
    name = StringField('Plan Name', validators=[DataRequired()])
    number_traveler =IntegerField('Number of Travelers', validators=[DataRequired()])
    private = BooleanField('Private', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    Country = StringField('Country', validators=[DataRequired()])
    start_date = DateField('Start Date', validators=[DataRequired()])
    end_date = DateField('End Date', validators=[DataRequired()])
    submit = SubmitField('Submit')
