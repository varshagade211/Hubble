from app.models import db, User, Post, Note , Image 


# Adds a demo user, you can add other users here if you want
def seed_post():
    user1 = User(email="brad@gmail.com", password="wings_wednesday",  username="Neil Armstrong",  profile_image="https://upload.wikimedia.org/wikipedia/commons/0/0d/Neil_Armstrong_pose.jpg",
     followers=[], following=[])

    user2 = User(email="andy@gmail.com",  password="cubingiscool",  username="Aries",
    profile_image="http://cdn.spacetelescope.org/archives/images/screen/opo0322a.jpg", followers=[user1], following=[user1])

    user3 = User(email="blue@gmail.com",  password="iamaninja",  username="SuperNova",
    profile_image="https://www.dpreview.com/files/p/articles/3337060032/sn2018gv-nasa-hubble-esa-banner.jpeg", followers=[user1, user2], following=[user1])

    user4 = User(email="patch@gmail.com",  password="ilovefud",  username="Halo",
    profile_image="http://www.nasa.gov/sites/default/files/thumbnails/image/stsci-h-p2019a-f-3000.jpg",
    followers=[user1, user2, user3], following=[user2, user3])


    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)

    post1 = Post(
        title="Working on a new project",
        description="model: Nova Star",
        type="image",
        user= user4,
        posts_likes=[user1,user2]
    )

    post2 = Post(
        title="That's one small step for man, one giant leap for mankind.",
        description="Neil Armstrong",
        type="quote",
        user= user2,
        posts_likes=[user1,user4]
    )
    post3 = Post(
        title="A. E. Housman, Astronomy",
        description="""
        The Wain upon the northern steep
        Descends and lifts away.
        Oh I will sit me down and weep
        For bones in Africa.

        For pay and medals, name and rank,
        Things that he has not found,
        He hove the Cross to heaven and sank
        The pole-star underground.

        And now he does not even see
        Signs of the nadir roll
        At night over the ground where he
        Is buried with the pole.
        """,
        type="Text",
        user= user3,
        posts_likes=[user4,user2]
    )
    post4 = Post(
        title="Space news",
        description="I like this website",
        type="link",
        link = 'https://www.space.com/stephans-quintet-its-a-wonderful-life',
        user= user4,
        posts_likes=[user1,user2]
    )

    post5 = Post(
        title="Views",
        description="New to the milky way",
        type="image",
        user= user4,
        posts_likes=[user1,user3]
    )
    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)

    image1 = Image(url="https://www.nasa.gov/sites/default/files/thumbnails/image/web_first_images_release.png",
                   post = post5)

    image2 = Image(url="https://ca-times.brightspotcdn.com/dims4/default/accaeae/2147483647/strip/true/crop/4675x3116+0+0/resize/1486x990!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fa4%2F73%2F2c507fbfdc9599e88ee9a1f720a7%2Fd89d1d1865634ce583f01f73ad3a5b81, https://cdn.vox-cdn.com/thumbor/vNNmMIfOCu8El3TO842E26LlmzY=/0x0:2799x2856/1920x0/filters:focal(0x0:2799x2856):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/23761963/main_image_deep_field_smacs0723_5mb.jpeg",
                   post= post1)

    db.session.add(image1)
    db.session.add(image2)

    note1 = Note(
        description = 'Out of this world!',
        user = user1,
        post = post2
    )

    note2 = Note(
        description = 'Dazzling',
        user = user1,
        post = post3
    )

    note3 = Note(
        description = 'Dont get it',
        user = user2,
        post = post3
    )

    note4 = Note(
        description = 'Loovee this website',
        user = user4,
        post = post5
    )

    db.session.add(note1)
    db.session.add(note2)
    db.session.add(note3)
    db.session.add(note4)

    db.session.commit()



# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_post():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
