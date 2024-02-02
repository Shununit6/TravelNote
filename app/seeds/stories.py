from app.models import db, Story, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo story, you can add other stories here if you want
def seed_stories():
    storyone = Story(
        user_id=1, place_id=1, title='sample', description='sample', article_url='sample', shorts_url='sample')
    storytwo = Story(
        user_id=1, place_id=4, title='sample', description='sample', article_url='sample', shorts_url='sample')
    storythree = Story(
        user_id=2, place_id=2, title='sample', description='sample', article_url='sample', shorts_url='sample')
    storyfour = Story(
        user_id=2, place_id=5, title='sample', description='sample', article_url='sample', shorts_url='sample')
    storyfive = Story(
        user_id=3, place_id=3, title='sample', description='sample', article_url='sample', shorts_url='sample')
    storysix = Story(
        user_id=3, place_id=6, title='sample', description='sample', article_url='sample', shorts_url='sample')

    db.session.add(storyone)
    db.session.add(storytwo)
    db.session.add(storythree)
    db.session.add(storyfour)
    db.session.add(storyfive)
    db.session.add(storysix)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_stories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stories"))

    db.session.commit()
