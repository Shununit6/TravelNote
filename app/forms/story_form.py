from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class StoryForm(FlaskForm):
    title = StringField('Story Title', validators=[DataRequired(message='Story Title is required')])
    description = StringField('Story Description', validators=[DataRequired(message='Story Description is required')])
    article_url = StringField('Article URL', validators=[DataRequired(message='Story Article URL is required')])
    shorts_url = StringField('Shorts URL', validators=[DataRequired(message='Story Shorts URL is required')])
    submit = SubmitField('Submit')
