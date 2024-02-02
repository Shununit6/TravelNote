from app.models import db, Expense, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo expense, you can add other expenses here if you want
def seed_users():
    expenseone = Expense(
        plan_id=1, name='Flight Ticket', amount=500, split=False)
    expensetwo = Expense(
        plan_id=2, name='Hotel', amount=1000, split=True)
    expensethree = Expense(
        plan_id=3, name='Taxi', amount=50, split=True)

    db.session.add(expenseone)
    db.session.add(expensetwo)
    db.session.add(expensethree)
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
