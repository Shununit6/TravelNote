from flask_wtf import FlaskForm
from wtforms import BooleanField, IntegerField, StringField, DateField, SubmitField
from wtforms.validators import DataRequired, NumberRange

class PlanForm(FlaskForm):
    name = StringField('Plan Name', validators=[DataRequired(message='Plan Name is required')])
    number_traveler =IntegerField('Number of Travelers', validators=[NumberRange(min=1, message='Number of travelers must be at least 1')])
    private = BooleanField('Private', default=True)
    city = StringField('City', validators=[DataRequired(message='City is required')])
    country = StringField('Country', validators=[DataRequired(message='Country is required')])
    start_date = DateField('Start Date', validators=[DataRequired(message='Start Date is required in yyyy-mm-dd format')])
    end_date = DateField('End Date', validators=[DataRequired(message='End Date is required in yyyy-mm-dd format')])
    submit = SubmitField('Submit')
