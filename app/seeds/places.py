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
        user_id=2, name='Maui', type='Island',
        description="""Maui is not nearly as large as the Big Island, nor is it as small as Lanai, as bustling as Oahu or as quiet as Kauai.
        For many Hawaii vacationers, Maui is just right - offering a taste of just about everything the Aloha State has to offer,
        from impressive wildlife to intriguing history and culture. While on a visit here, you can shimmy alongside professional hula dancers,
        golf along coastal fairways, sail down a zip line, snorkel alongside five different types of sea turtles
        or simply lounge along some of Hawaii's most notable beaches.""")
    #Got description from https://travel.usnews.com/Maui_HI/
    placethree = Place(
        user_id=3, name='Glacier National Park', type='Park',
        description="""Named for the remnants of glaciers from the ice age, Glacier National Park is located on the border of Canada and Montana.
        It is often called the "Crown of the Continent," because of its dizzying array of natural beauty. A favorite spot among hikers,
        the park features a variety of trails for all skill levels, ranging from the easy Trail of the Cedars (home to towering and beautiful cedars)
        to the challenging Grinnell Glacier (which offers sweeping views). What's more, the park boasts more than 700 lakes,
        numerous waterfalls and two mountain ranges, spread across more than 1 million acres that shelter a variety of wildlife.""")
    # Got description from https://travel.usnews.com/Glacier_National_Park_MT/
    placefour = Place(
        user_id=1, name='Las Vegas', type='City',
        description="""Sin City, America's Playground, the Entertainment Capital of the World ... all worthy names for this Nevada hot spot.
        Think of Vegas as a theme park rather than a city it can awe as much as it can overwhelm, and that's part of the appeal.
        This is a city where inhibitions are not welcome: Every night, Las Vegas draws pleasure mongers to the brightly lit Strip like moths
        to a flame. While you may not want to go as far as to reenact "The Hangover," you certainly don't want to leave without experiencing
        a bit of "Viva Las Vegas.""")
    # Got description from https://travel.usnews.com/Las_Vegas_NV/
    placefive = Place(
        user_id=2, name='Grand Canyon National Park', type='Park', description=""""Grand" doesn't begin to do this canyon justice.
        Measuring approximately 277 river miles in length, up to 18 miles in width and a mile deep, this massive chasm in northern Arizona
        is truly a natural wonder. For 6 million years, the Grand Canyon has expanded with the help of the mighty Colorado River,
        and for centuries, people from all over the globe have traveled to gaze out over its red and orange grandeur.
        Managed by the National Park Service and officially designated as a UNESCO World Heritage Site,
        the Grand Canyon leaves its approximately 4 million visitors per year awestruck.""")
    # Got description from https://travel.usnews.com/Grand_Canyon_AZ/
    placesix = Place(
        user_id=3, name='Honolulu - Oahu', type='Island',
        description="""Oahu blends cosmopolitan luxury and breathtaking scenery more than any other Hawaiian island. The state's capital city,
        Honolulu, showcases the island's urban appeal. Nearby you'll find a host of cultural and historic sites, from the ornate Iolani Palace
        to the austere USS Arizona Memorial at the Pearl Harbor National Memorial. In the nearby Waikiki neighborhood, a skyline of high-rises
        and resorts contrasts with sprawling white sand beaches. For a taste of rural Hawaii, visit the North Shore. Here, you'll find the most
        brilliant blue waters and meandering hikes. But those three spots aren't Oahu's only must-see locales. Its top-notch restaurants,
        vibrant cultural events and wild nightlife further showcase this island as a "Gathering Place" of Hawaiian culture.""")
    # Got description from https://travel.usnews.com/Honolulu_Oahu_HI/

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
        db.session.execute(f"TRUNCATE table {SCHEMA}.places RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM places"))

    db.session.commit()
