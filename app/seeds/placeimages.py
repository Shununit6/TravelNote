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
        place_id=2, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/03/26/87/amazing-road-with-incredible.jpg?w=1400&h=-1&s=1')
    imagefive = Placeimage(
        place_id=2, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/cc/d8/b8/caption.jpg?w=1400&h=-1&s=1')
    imagesix = Placeimage(
        place_id=2, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/60/da/b5/inanilmaz-bir-snorkel.jpg?w=700&h=-1&s=1')
    imageseven = Placeimage(
        place_id=3, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/10/2e/7c/glacier-national-park.jpg?w=2400&h=-1&s=1')
    imageeight = Placeimage(
        place_id=3, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/9c/bd/7a/st-mary-lake-in-early.jpg?w=1600&h=-1&s=1')
    imagenine = Placeimage(
        place_id=3, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/02/32/bf/35/hidden-lake-logan-s-pass.jpg?w=2400&h=-1&s=1')
    imageten = Placeimage(
        place_id=4, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/34/2d/28/caption.jpg?w=1400&h=-1&s=1&cx=662&cy=604&chk=v1_8984ddf3493edfb8c896')
    imageeleven = Placeimage(
        place_id=4, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/11/13/7f/fontaines-du-bellagio.jpg?w=1600&h=-1&s=1')
    imagetwelve = Placeimage(
        place_id=4, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/64/d9/0f/fall-2016-display.jpg?w=2000&h=-1&s=1')
    imagethirteen = Placeimage(
        place_id=5, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/83/4a/64/grand-canyon-national.jpg?w=1400&h=-1&s=1')
    imagefourteen = Placeimage(
        place_id=5, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/83/4a/1d/grand-canyon-national.jpg?w=1400&h=-1&s=1')
    imagefifteen = Placeimage(
        place_id=5, image_url='https://en.wikipedia.org/wiki/Grand_Canyon_National_Park#/media/File:Dawn_on_the_S_rim_of_the_Grand_Canyon_(8645178272).jpg')
    imagesixteen = Placeimage(
        place_id=6, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c1/a0/72/caption.jpg?w=1400&h=-1&s=1')
    imageseventeen = Placeimage(
        place_id=6, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/cf/78/ba/hilton-hawaiian-village.jpg?w=2000&h=-1&s=1')
    imageeighteen = Placeimage(
        place_id=6, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/47/07/a0/excellent-views.jpg?w=2400&h=-1&s=1')


    db.session.add(imageone)
    db.session.add(imagetwo)
    db.session.add(imagethree)
    db.session.add(imagefour)
    db.session.add(imagefive)
    db.session.add(imagesix)
    db.session.add(imageseven)
    db.session.add(imageeight)
    db.session.add(imagenine)
    db.session.add(imageten)
    db.session.add(imageeleven)
    db.session.add(imagetwelve)
    db.session.add(imagethirteen)
    db.session.add(imagefourteen)
    db.session.add(imagefifteen)
    db.session.add(imagesixteen)
    db.session.add(imageseventeen)
    db.session.add(imageeighteen)
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
