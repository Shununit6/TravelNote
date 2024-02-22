from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Plan, Expense
from ..forms.plan_form import PlanForm
from ..forms.expense_form import ExpenseForm

plan_routes = Blueprint('plans', __name__)

#Get all the plans
### Require Authentication: false
### `GET /api/plans`
@plan_routes.route('/')
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
    if(not plan):
        return {'errors': f"Plan {planId} does not exist."}, 404
    return jsonify(plan.to_dict())

# Create a plan
# Require Authentication: true
# POST /api/plans
@plan_routes.route('/', methods=['POST'])
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
    return form.errors, 401

# Create an expense to a selected plan
# Require Authentication: true
# POST /api/plans/:planId/expenses
@plan_routes.route('/<int:planId>/expenses', methods = ['POST'])
@login_required
def new_expense_to_plan(planId):
    plan = Plan.query.filter(Plan.id==planId).first()
    if not plan:
        return {'error':f"Plan {planId} is not found"}, 404
    if (plan.user_id != current_user.id):
        return {'errors': {'message': 'Unauthorized'}}, 401
    """
    Creates and returns a new expense in a dictionary.
    """
    form = ExpenseForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_expense = Expense(
            plan_id=planId,
            name=form.data['name'],
            amount=form.data['amount'],
            split = form.data['split'],
        )

        db.session.add(new_expense)
        db.session.commit()

        return jsonify(new_expense.to_dict()), 201  # HTTP status code for Created
    return form.errors, 401

# Add an existing expense to one of the current user's plans
# Require Authentication: true
# POST /api/plans/:planId/expenses/:expenseId
@plan_routes.route('/<int:planId>/expenses/<int:expenseId>', methods = ['POST'])
@login_required
def add_expense_to_plan(expenseId, planId):
  expense = Expense.query.get(expenseId)
  if expense.plan_id == planId:
      return {'error':f"Bad Request, Expense {expenseId} with Plan {planId} already exist"}, 400
  if not expense:
      return {'error':f"Expense {expenseId} is not found"}, 404
  plan = Plan.query.filter(Plan.id==planId).first()
  if (plan.user_id != current_user.id):
      return {'errors': {'message': 'Unauthorized'}}, 401
  if not plan:
      return {'error':f"Plan {planId} is not found"}, 404

  plan = Plan.query.filter(Plan.user_id==current_user.get_id()).filter(Plan.id==planId).first()

  if expense and plan:
    new_expense = Expense(
            plan_id=planId,
            name=expense.name,
            amount=expense.amount,
            split = expense.split,
    )
    db.session.add(new_expense)
    db.session.commit()
    return jsonify(new_expense.to_dict()), 201  # HTTP status code for Created
  return {'error':f"Failed to add Expense {expenseId} to Plan {planId}"}, 401

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
        return {'errors': f"Forbidden, Plan {planId} is not created by the current user."}, 403
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
        return {'errors': f"Forbidden, Plan {planId} is not created by the current user."}, 403
    db.session.delete(planbyid)
    db.session.commit()
    return jsonify({'message': 'Successfully deleted'})
