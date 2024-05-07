from flask_wtf import FlaskForm
from wtforms import BooleanField, IntegerField, StringField, SubmitField
from wtforms.validators import DataRequired, NumberRange

class ExpenseForm(FlaskForm):
    plan_id =IntegerField('PlanId', validators=[NumberRange(min=1, message='PlanId must be at least 1')])
    name = StringField('Expense Name', validators=[DataRequired(message='Expense Name is required')])
    category = StringField ('Expense Type', validators=[DataRequired(message='Expense Type is required' )])
    amount =IntegerField('Expense Amount', validators=[NumberRange(min=1, message='Expense Amount must be at least $1')])
    split = BooleanField('Split', default=True)
    submit = SubmitField('Submit')
