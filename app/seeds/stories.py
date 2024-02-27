from app.models import db, Story, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo story, you can add other stories here if you want
def seed_stories():
    storyone = Story(
        user_id=1, title='Central Park Walking Tour', description='Central Park Walking Tour with JK NYC Tours', article_url='https://www.thetravelmagazine.net/central-park-walking-tour-jk-nyc-tours/', shorts_url='https://twitter.com/TravelMagazine/status/809160350503436288')
    storytwo = Story(
        user_id=1, title='Restaurant Review', description='A California-inspired restaurant in Canary Wharf, Feels Like June successfully crosses the Atlantic.', article_url='https://www.thetravelmagazine.net/restaurant-review-feels-like-june-canary-wharf-london-uk/', shorts_url='none')
    storythree = Story(
        user_id=2, title='Yosemite National Park', description='Iconic hikes at Yosemite National Park, California, USA', article_url='https://www.thetravelmagazine.net/yosemite/', shorts_url='none')
    storyfour = Story(
        user_id=2, title='Amos Rex museum', description='Experiencing the light fantastic at the Amos Rex museum in Helsinki, Finland', article_url='https://www.thetravelmagazine.net/experiencing-the-light-fantastic-at-the-amos-rex-museum-in-helsinki-finland/', shorts_url='https://www.youtube.com/watch?v=Wv5an3OTfQE')
    storyfive = Story(
        user_id=3, title='A perfect day in New Delhi', description='Old Delhi, New Delhi, and some Indian classics', article_url='https://www.tripadvisor.com/Articles-l6mA1De3r3aY-One_day_in_new_delhi_itineraryone_day_in_new_delhi_itineraryone_day_in_new_delhi_itineraryone_day_in_n.html', shorts_url='none')
    storysix = Story(
        user_id=3, title='Costa Rica', description='My family adventure in Costa Rica and 9 ways to keep the kids entertained (and yes, there are howler monkeys)', article_url='https://www.tripadvisor.com/Articles-luj7i2N4Awsc-Costa_rica_family_adventure.html', shorts_url='none')
    # storyseven= Story(
    #     user_id=1, place_id=1, title='sample', description='sample', article_url='sample', shorts_url='sample')
    # storyeight = Story(
    #     user_id=1, place_id=4, title='sample', description='sample', article_url='sample', shorts_url='sample')
    # storynine = Story(
    #     user_id=2, place_id=2, title='sample', description='sample', article_url='sample', shorts_url='sample')
    # storyten = Story(
    #     user_id=2, place_id=5, title='sample', description='sample', article_url='sample', shorts_url='sample')
    # storyeleven = Story(
    #     user_id=3, place_id=3, title='sample', description='sample', article_url='sample', shorts_url='sample')
    # storytwelve = Story(
    #     user_id=3, place_id=6, title='sample', description='sample', article_url='sample', shorts_url='sample')

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
