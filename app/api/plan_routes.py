from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Plan
from ..forms.create_edit_album_form import CreateEditAlbumForm

plan_routes = Blueprint('plans', __name__)

#Get all the plans
### Require Authentication: false
### `GET /api/plans`
@plan_routes.route('/')
@login_required
def get_all_plans():
    """
    Query for all plans and returns them in a list of plan dictionaries
    """
    plans = Plan.query.all()
    return {'plans': [plan.to_dict() for plan in plans]}

### Get all plans created by the Current User
###  Require Authentication: true
###  `GET /api/plans/current`
@plan_routes.route('/current')
@login_required
def get_current_plans():
    """
    Query for all the plans that are created by the Current User and returns them in a list of plan dictionaries
    """
    current_plans = Plan.query.filter_by(user_id=current_user.id).all()
    return jsonify({'plans': [plan.to_dict() for plan in current_plans]})

# Get details of a plan from an id
# Require Authentication: false
# GET /api/plans/:planId
@plan_routes.route('/<int:planId>')
def get_plans_by_id(planId):
    """
    Query for the details of a plan specified by its id and returns that plan in a dictionary.
    """
    plan = Plan.query.get(planId)
    return jsonify(plan.to_dict())

# Create a plan
# Require Authentication: true
# POST /api/plans
