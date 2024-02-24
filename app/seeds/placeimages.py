from app.models import db, Placeimage, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo placeimage, you can add other placeimages here if you want
def seed_placeimages():
    imageone = Placeimage(
        place_id=1, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/44/04/42/conservatory.jpg?w=2200&h=-1&s=1')
    imagetwo = Placeimage(
        place_id=1, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/be/6e/af/when-you-ve-finished.jpg?w=1400&h=-1&s=1')
    imagethree = Placeimage(
        place_id=1, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/09/1e/a7/golden-gate-park.jpg?w=1400&h=-1&s=1')
    imagefour = Placeimage(
        place_id=1, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/c2/5d/2a/golden-gate-national.jpg?w=2000&h=-1&s=1')
    imagefive = Placeimage(
        place_id=2, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/44/04/42/conservatory.jpg?w=2200&h=-1&s=1')
    imagesix = Placeimage(
        place_id=2, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/be/6e/af/when-you-ve-finished.jpg?w=1400&h=-1&s=1')
    imageseven = Placeimage(
        place_id=3, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/09/1e/a7/golden-gate-park.jpg?w=1400&h=-1&s=1')
    imageeight = Placeimage(
        place_id=3, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/c2/5d/2a/golden-gate-national.jpg?w=2000&h=-1&s=1')

    db.session.add(imageone)
    db.session.add(imagetwo)
    db.session.add(imagethree)
    db.session.add(imagefour)
    db.session.add(imagefive)
    db.session.add(imagesix)
    db.session.add(imageseven)
    db.session.add(imageeight)
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
