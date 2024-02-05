from flask_wtf import FlaskForm
from wtforms import BooleanField, IntegerField, StringField, SubmitField
from wtforms.validators import DataRequired, NumberRange

class ExpenseForm(FlaskForm):
    name = StringField('Expense Name', validators=[DataRequired(message='Expense Name is required')])
    amount =IntegerField('Expense Amount', validators=[NumberRange(min=1, message='Expense Amount must be at least $1')])
    split = BooleanField('Split', default=True)
    submit = SubmitField('Submit')
