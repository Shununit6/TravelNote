from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Expense
from ..forms.expense_form import ExpenseForm

expense_routes = Blueprint('expenses', __name__)

#Get all the expenses
### Require Authentication: false
### `GET /api/expenses`
@expense_routes.route('/')
def get_all_expenses():
    """
    Query for all expenses and returns them in a list of expense dictionaries
    """
    expenses = Expense.query.all()
    return {'expenses': [expense.to_dict() for expense in expenses]}

### Get all expenses created by the Current User
###  Require Authentication: true
###  `GET /api/expenses/current`
@expense_routes.route('/current')
@login_required
def get_current_expenses():
    """
    Query for all the expenses that are created by the Current User and returns them in a list of expense dictionaries
    """
    current_expenses = Expense.query.filter_by(user_id=current_user.id).all()
    return jsonify({'expenses': [expense.to_dict() for expense in current_expenses]})

# Get details of a expense from an id
# Require Authentication: false
# GET /api/expenses/:expenseId
@expense_routes.route('/<int:expenseId>')
def get_expenses_by_id(expenseId):
    """
    Query for the details of a expense specified by its id and returns that expense in a dictionary.
    """
    expense = Expense.query.get(expenseId)
    if(not expense):
        return {'errors': f"Expense {expenseId} does not exist."}, 404
    return jsonify(expense.to_dict())

# Create a expense
# Require Authentication: true
# POST /api/expenses
@expense_routes.route('/', methods=['POST'])
@login_required
def post_expense():
    """
    Creates and returns a new expense in a dictionary.
    """
    form = ExpenseForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_expense = Expense(
            # plan_id=,
            name=form.data['name'],
            amount=form.data['amount'],
            split = form.data['split'],
        )

        db.session.add(new_expense)
        db.session.commit()

        return jsonify(new_expense.to_dict()), 201  # HTTP status code for Created
    return form.errors, 401



# Edit a Expense
# Updates and returns an existing expense.
# Require Authentication: true
# Require proper authorization: Expense must be created by the current user
# PUT /api/expenses/:expenseId
@expense_routes.route('/<int:expenseId>', methods=['PUT'])
@login_required
def edit_expense(expenseId):
    expensebyid = Expense.query.get(expenseId)
    if not expensebyid:
        return {'errors': f"Expense {expenseId} does not exist."}, 404
    # checks if expense is created by the current user
    if expensebyid.user_id != current_user.id:
        return {'errors': f"Forbidden, Expense {expenseId} is not created by the current user."}, 403
    payload= request.get_json()
    expensebyid.name=payload['name']
    expensebyid.number_traveler=payload['number_traveler']
    expensebyid.private=payload['private']
    expensebyid.city=payload['city']
    expensebyid.country=payload['country']
    expensebyid.start_date=payload['start_date']
    expensebyid.end_date=payload['end_date']
    db.session.commit()
    return jsonify(expensebyid.to_dict())


# Delete a expense
# Deletes an existing expense: A logged in user may delete one of their own expenses, removing it from the list of visible expenses without causing a refresh/redirect.
# Require Authentication: true
# Require proper authorization: Expense must be created by the current user
# DELETE /api/expenses/:expenseId
@expense_routes.route('/<int:expenseId>', methods=['DELETE'])
@login_required
def delete_expense(expenseId):
    expensebyid = Expense.query.get(expenseId)
    if not expensebyid:
        return {'errors': f"Expense {expenseId} does not exist."}, 404
    # checks if expense is created by the current user
    if expensebyid.user_id != current_user.id:
        return {'errors': f"Forbidden, Expense {expenseId} is not created by the current user."}, 403
    db.session.delete(expensebyid)
    db.session.commit()
    return jsonify({'message': 'Successfully deleted'})
