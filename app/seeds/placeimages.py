from app.models import db, Placeimage, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo placeimage, you can add other placeimages here if you want
def seed_placeimages():
    imageone = Placeimage(
        place_id=1, image_url='url')
    imagetwo = Placeimage(
        place_id=2, image_url='url')
    imagethree = Placeimage(
        place_id=3, image_url='url')

    db.session.add(imageone)
    db.session.add(imagetwo)
    db.session.add(imagethree)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the placeimages table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_placeimages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.placeimages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM placeimages"))

    db.session.commit()
