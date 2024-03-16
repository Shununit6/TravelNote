from app.models import db, Expense, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo expense, you can add other expenses here if you want
def seed_expenses():
    expenseone = Expense(
        plan_id=1, name='Flight Ticket', category='Transportation', amount=500, split=False)
    expensetwo = Expense(
        plan_id=2, name='Hotel', category='Lodging', amount=1000, split=True)
    expensethree = Expense(
        plan_id=3, name='Taxi', category='Transportation', amount=50, split=True)
    expensefour = Expense(
        plan_id=1, name='Dinners', category='Food', amount=250, split=True)
    expensefive = Expense(
        plan_id=2, name='Museum Tickets', category='Entertainment', amount=20, split=False)
    expensesix = Expense(
        plan_id=3, name='Live Show Tickets', category='Entertainment', amount=35, split=True)
    expenseseven = Expense(
        plan_id=1, name='Street Food', category='Food', amount=50, split=True)
    expenseeight = Expense(
        plan_id=2, name='Coffee', category='Food', amount=10, split=False)
    expensenine = Expense(
        plan_id=3, name='Bar', category='Food', amount=200, split=False)
    expenseten = Expense(
        plan_id=4, name='Flight Ticket', category='Transportation', amount=500, split=False)
    expenseeleven = Expense(
        plan_id=5, name='Hotel', category='Lodging', amount=1000, split=True)
    expensetwelve = Expense(
        plan_id=6, name='Taxi', category='Transportation', amount=50, split=True)
    expensethirteen = Expense(
        plan_id=4, name='Dinners', category='Food', amount=250, split=True)
    expensefourteen = Expense(
        plan_id=5, name='Museum Tickets', category='Entertainment', amount=20, split=False)
    expensefifteen = Expense(
        plan_id=6, name='Live Show Tickets', category='Entertainment', amount=35, split=True)
    expensesixteen = Expense(
        plan_id=4, name='Street Food', category='Food', amount=50, split=True)
    expenseseventeen = Expense(
        plan_id=5, name='Coffee', category='Food', amount=10, split=False)
    expenseeighteen = Expense(
        plan_id=6, name='Bar', category='Food', amount=200, split=False)
    expensenineteen = Expense(
        plan_id=1, name='Hotel', category='Lodging', amount=1500, split=True)
    expensetwenty = Expense(
        plan_id=1, name='Museum Tickets', category='Entertainment', amount=100, split=True)
    expensetwentyone = Expense(
        plan_id=1, name='Cleaning and laundry', category='Other', amount=5, split=False)
    expensetwentytwo = Expense(
        plan_id=1, name='Rental Car', category='Other', amount=1200, split=False)
    expensetwentythree = Expense(
        plan_id=2, name='Gas', category='Other', amount=222, split=False)
    expensetwentyfour = Expense(
        plan_id=2, name='Airport Parking', category='Other', amount=120, split=False)
    expensetwentyfive = Expense(
        plan_id=5, name='Rental Car', category='Other', amount=800, split=False)
    expensetwentysix = Expense(
        plan_id=5, name='Gas', category='Other', amount=180, split=False)
    # expensetwentytwo
    # expensetwentythree
    # expensetwentyfour
    # expensetwentyfive
    # expensetwentysix
    # expensetwentyseven
    # expensetwentyeight
    # expensetwentynine
    # expensethirty
    # expensethirtyone
    # expensethirtytwo
    # expensethirtythree
    # expensethirtyfour
    # expensethirtyfive
    # expensethirtysix
    # expensethirtyseven
    # expensethirtyeight
    # expensethirtynine
    # expensefourty

    db.session.add(expenseone)
    db.session.add(expensetwo)
    db.session.add(expensethree)
    db.session.add(expensefour)
    db.session.add(expensefive)
    db.session.add(expensesix)
    db.session.add(expenseseven)
    db.session.add(expenseeight)
    db.session.add(expensenine)
    db.session.add(expenseten)
    db.session.add(expenseeleven)
    db.session.add(expensetwelve)
    db.session.add(expensethirteen)
    db.session.add(expensefourteen)
    db.session.add(expensefifteen)
    db.session.add(expensesixteen)
    db.session.add(expenseseventeen)
    db.session.add(expenseeighteen)
    db.session.add(expensenineteen)
    db.session.add(expensetwenty)
    db.session.add(expensetwentyone)
    db.session.add(expensetwentytwo)
    db.session.add(expensetwentythree)
    db.session.add(expensetwentyfour)
    db.session.add(expensetwentyfive)
    db.session.add(expensetwentysix)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the expenses table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_expenses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.expenses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM expenses"))

    db.session.commit()
