from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Plan
from ..forms.plan_form import PlanForm

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
@plan_routes.route('/', method=['POST'])
@login_required
def post_plan():
    """
    Creates and returns a new plan in a dictionary.
    """
    form = PlanForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_plan = Plan(
            user_id=current_user.id,
            name=form.data['name'],
            number_traveler=form.data['number_traveler'],
            private = form.data['private'],
            city=form.data['city'],
            country=form.data['country'],
            start_date=form.data['start_date'],
            end_date=form.data['end_date']
        )

        db.session.add(new_plan)
        db.session.commit()

        return jsonify(new_plan.to_dict()), 201  # HTTP status code for Created
    return jsonify({"PlanForm validation failed.", form.errors}), 401



# Edit a Plan
# Updates and returns an existing plan.
# Require Authentication: true
# Require proper authorization: Plan must be created by the current user
# PUT /api/plans/:planId
@plan_routes.route('/<int:planId>', methods=['PUT'])
@login_required
def edit_plan(planId):
    planbyid = Plan.query.get(planId)
    if not planbyid:
        return {'errors': f"Plan {planId} does not exist."}, 404
    # checks if plan is created by the current user
    if planbyid.user_id != current_user.id:
        return {'errors': f"Forbidden, Plan {planId} must be created by the current user."}, 403
    payload= request.get_json()
    planbyid.name=payload['name']
    planbyid.number_traveler=payload['number_traveler']
    planbyid.private=payload['private']
    planbyid.city=payload['city']
    planbyid.country=payload['country']
    planbyid.start_date=payload['start_date']
    planbyid.end_date=payload['end_date']
    db.session.commit()
    return jsonify(planbyid.to_dict())


# Delete a plan
# Deletes an existing plan: A logged in user may delete one of their own plans, removing it from the list of visible Plans without causing a refresh/redirect.
# Require Authentication: true
# Require proper authorization: Plan must be created by the current user
# DELETE /api/plans/:planId
@plan_routes.route('/<int:planId>', methods=['DELETE'])
@login_required
def delete_plan(planId):
    planbyid = Plan.query.get(planId)
    if not planbyid:
        return {'errors': f"Plan {planId} does not exist."}, 404
    # checks if plan is created by the current user
    if planbyid.user_id != current_user.id:
        return {'errors': f"Forbidden, Plan{planId} must be created by the current user."}, 403
    db.session.delete(planbyid)
    db.session.commit()
    return jsonify({'message': 'Successfully deleted'})
