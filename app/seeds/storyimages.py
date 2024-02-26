from app.models import db, Storyimage, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo storyimage, you can add other storyimages here if you want
def seed_storyimages():
    imageone = Storyimage(
        story_id=1, image_url='https://www.thetravelmagazine.net/wp-content/uploads/Fall-in-Central-Park-New-York.jpg')
    imagetwo = Storyimage(
        story_id=2, image_url='https://www.thetravelmagazine.net/wp-content/uploads/DSCF9631.jpg')
    imagethree = Storyimage(
        story_id=2, image_url='https://www.thetravelmagazine.net/wp-content/uploads/DSCF9650.jpg')
    imagefour = Storyimage(
        story_id=2, image_url='https://www.thetravelmagazine.net/wp-content/uploads/DSCF9645.jpg')
    imagefive = Storyimage(
        story_id=2, image_url='https://www.thetravelmagazine.net/wp-content/uploads/DSCF9666.jpg')
    imagesix = Storyimage(
        story_id=2, image_url='https://www.thetravelmagazine.net/wp-content/uploads/DSCF9660.jpg')
    imageseven = Storyimage(
        story_id=3, image_url='https://www.thetravelmagazine.net/wp-content/uploads/Yosemite-National-Park.jpg')
    imageeight = Storyimage(
        story_id=3, image_url='https://www.thetravelmagazine.net/wp-content/uploads/Four-mile-trail.jpg')
    imagenine = Storyimage(
        story_id=3, image_url='https://www.thetravelmagazine.net/wp-content/uploads/Vernal-Falls-Spring.jpg')
    imageten = Storyimage(
        story_id=4, image_url='https://www.thetravelmagazine.net/wp-content/uploads/Amos-Rex-Exterior.jpg')
    imageeleven = Storyimage(
        story_id=4, image_url='https://www.thetravelmagazine.net/wp-content/uploads/Amos-Rex-Black-Waves.jpg')
    imagetwelve = Storyimage(
        story_id=4, image_url='https://www.thetravelmagazine.net/wp-content/uploads/Amos-Rex-Graffiti-Nature.jpg')
    imagethirteen = Storyimage(
        story_id=5, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/7b/01/1d/caption.jpg?w=1200&h=-1&s=1&cx=1920&cy=1080&chk=v1_4de65d90c08149c68f26')
    imagefourteen = Storyimage(
        story_id=5, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/7b/01/47/caption.jpg?w=800&h=-1&s=1')
    imagefifteen = Storyimage(
        story_id=5, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/7b/01/6d/caption.jpg?w=800&h=-1&s=1')
    imagesixteen = Storyimage(
        story_id=5, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/7b/01/a3/caption.jpg?w=800&h=-1&s=1')
    imageseventeen = Storyimage(
        story_id=6, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/50/aa/18/caption.jpg?w=800&h=400&s=1&cx=360&cy=240&chk=v1_620a13ab389018ee78d0')
    imageeighteen = Storyimage(
        story_id=6, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/50/a6/bc/caption.jpg?w=800&h=400&s=1')
    imagenineteen = Storyimage(
        story_id=6, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/50/a4/d0/caption.jpg?w=800&h=400&s=1')
    imagetwenty = Storyimage(
        story_id=6, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/50/a2/9e/caption.jpg?w=800&h=400&s=1')
    imagetwentyone = Storyimage(
        story_id=6, image_url='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/50/a0/d4/caption.jpg?w=800&h=-1&s=1')


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
    db.session.add(imageseventeen)
    db.session.add(imageeighteen)
    db.session.add(imagenineteen)
    db.session.add(imagetwenty)
    db.session.add(imagetwentyone)
    # db.session.add(imagetwentytwo)
    # db.session.add(imagetwentythree)
    # db.session.add(imagetwentyfour)
    # db.session.add(imagetwentyfive)
    # db.session.add(imagetwentysix)
    # db.session.add(imagetwentyseven)
    # db.session.add(imagetwentyeight)
    # db.session.add(imagetwentynine)
    # db.session.add(imagethirty)
    # db.session.add(imagethirtyone)
    # db.session.add(imagethirtytwo)
    # db.session.add(imagethirtythree)
    # db.session.add(imagethirtyfour)
    # db.session.add(imagethirtyfive)
    # db.session.add(imagethirtysix)
    # db.session.add(imagethirtyseven)
    # db.session.add(imagethirtyeight)
    # db.session.add(imagethirtynine)
    # db.session.add(imageforty)
    # db.session.add(imagefortyone)
    # db.session.add(imagefortytwo)
    # db.session.add(imagefortythree)
    # db.session.add(imagefortyfour)
    # db.session.add(imagefortyfive)
    # db.session.add(imagefortysix)
    # db.session.add(imagefortyseven)
    # db.session.add(imagefortyeight)
    # db.session.add(imagefortynine)
    # db.session.add(imagefifty)
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
