from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, Plan

plan_routes = Blueprint('plans', __name__)

#Get all the plans
@plan_routes.route('/')
@login_required
def get_all_plans():
    """
    Query for all plans and returns them in a list of plan dictionaries
    """
    plans = Plan.query.all()
    return {'plans': [plan.to_dict() for plan in plans]}


@plan_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
