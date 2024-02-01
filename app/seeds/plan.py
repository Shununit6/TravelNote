from app.models import db, Plan, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo plan, you can add other plans here if you want
def seed_users():
    planone = Plan(
        user_id=1, name='Summer Vacation', number_traveler='5', private=False, city='Honolulu', country='United States', start_date='2024-08-08', end_date='2024-08-16')
    plantwo = Plan(
        user_id=2, name='Family Trip', number_traveler='8', private=False, city='Cabo San Lucas', country='Mexico', start_date='2024-11-11', end_date='2024-11-16')
    planthree = Plan(
        user_id=3, name='Anniversary', number_traveler='2', private=False, city='Bangkok', country='Thailand', start_date='2025-01-11', end_date='2025-01-18')
    planfour = Plan(
        user_id=1, name='Park', number_traveler='6', private=False, city='', country='', start_date='', end_date='')
    planfive = Plan(
        user_id=2, name='Europe Tour', number_traveler='4', private=False, city='Paris', country='France', start_date='', end_date='')
    plansix = Plan(
        user_id=3, name='Asia Trip', number_traveler='', private=False, city='Tokyo', country='Japan', start_date='', end_date='')
    plantseven = Plan(
        user_id=1, name="Eric's Wedding", number_traveler='5', private=True, city='Napa', country='United States', start_date='2025-07-02', end_date='2025-07-04')

    db.session.add(planone)
    db.session.add(plantwo)
    db.session.add(planthree)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
