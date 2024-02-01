from app.models import db, Place, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo place, you can add other places here if you want
def seed_places():
    placeone = Place(
        user_id=1, name='Golden Gate Park', type='Park',
        desciption="""Golden Gate Park is an urban park between the Richmond and Sunset districts of San Francisco, United States.
        It is the largest park in the city, containing 1,017 acres, and the third-most visited urban park in the United States,
        with an estimated 24 million visitors annually.""")
    #Got description from https://en.wikipedia.org/wiki/Golden_Gate_Park
    placetwo = Place(
        user_id=2, name='Maui', type='Island', description="""Maui is not nearly as large as the Big Island, nor is it as small as Lanai,
        as bustling as Oahu or as quiet as Kauai. For many Hawaii vacationers, Maui is just right - offering a taste of just about
        everything the Aloha State has to offer, from impressive wildlife to intriguing history and culture. While on a visit here,
        you can shimmy alongside professional hula dancers, golf along coastal fairways, sail down a zip line, snorkel alongside five
        different types of sea turtles or simply lounge along some of Hawaii's most notable beaches.""")
    #Got description from https://travel.usnews.com/Maui_HI/
    placethree = Place(
        user_id=3, name='', type='', description='')
    placefour = Place(
        user_id=1, name='', type='', description='')
    placefive = Place(
        user_id=2, name='', type='', description='')
    placesix = Place(
        user_id=3, name='', type='', description='')


    db.session.add(placeone)
    db.session.add(placetwo)
    db.session.add(placethree)
    db.session.add(placefour)
    db.session.add(placefive)
    db.session.add(placesix)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the places table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_places():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
