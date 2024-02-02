from app.models import db, Storyimage, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo storyimage, you can add other storyimages here if you want
def seed_storyimages():
    imageone = Storyimage(
        story_id=1, image_url='url')
    imagetwo = Storyimage(
        story_id=2, image_url='url')
    imagethree = Storyimage(
        story_id=3, image_url='url')

    db.session.add(imageone)
    db.session.add(imagetwo)
    db.session.add(imagethree)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the storyimages table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_storyimages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.storyimages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM storyimages"))

    db.session.commit()
