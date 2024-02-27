from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Storyimage, Story
from ..forms.storyimage_form import StoryImageForm

storyimage_routes = Blueprint('storyimages', __name__)

#Get all the storyimages
### Require Authentication: false
### `GET /api/stories/images`
@storyimage_routes.route('/images')
def get_all_storyimages():
    """
    Query for all storyimages and returns them in a list of storyimages dictionaries
    """
    storyimages = Storyimage.query.all()
    return {'storyimages': [storyimage.to_dict() for storyimage in storyimages]}

#Get all the images of a story by id
### Require Authentication: false
### `GET /api/stories/:storyId/images`
@storyimage_routes.route('/<int:storyId>/images')
def get_imagesof_story(storyId):
    """
    Query for all the images of a story by id and returns them in a list of storyimages dictionaries
    """
    storyimages = Storyimage.query.filter(Storyimage.story_id == storyId)
    story = Story.query.get(storyId)
    if(not story):
        return {'errors': f"story {storyId} does not exist."}, 404
    # return jsonify(storyimages.to_dict())
    return jsonify({'storyimages': [storyimage.to_dict() for storyimage in storyimages]})

# Create an image for a story
# Require Authentication: true
# POST /api/stories/:storyId/images
@storyimage_routes.route('/<int:storyId>/images', methods=['POST'])
@login_required
def post_storyimage(storyId):
     # checks if story is created by the current user
    story = Story.query.get(storyId)
    if story.user_id != current_user.id:
        return {'errors': f"Forbidden, Story {story.id} is not created by the current user."}, 403
    """
    Creates and returns a new storyimage in a dictionary.
    """
    form = StoryImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_storyimage = Storyimage(
            story_id=storyId,
            image_url= form.data['image_url'],
        )

        db.session.add(new_storyimage)
        db.session.commit()

        return jsonify(new_storyimage.to_dict()), 201  # HTTP status code for Created
    return form.errors, 401

# Edit a storyimage
# Updates and returns an existing image.
# Require Authentication: true
# Require proper authorization: Story must be created by the current user
# PUT /api/stories/images/:imageId
@storyimage_routes.route('/images/<int:imageId>', methods=['PUT'])
@login_required
def edit_storyimage(imageId):
    storyimagebyid = Storyimage.query.get(imageId)
    if not storyimagebyid:
        return {'errors': f"Storyimage {imageId} does not exist."}, 404
    # checks if story is created by the current user
    story = Story.query.get(storyimagebyid.story_id)
    if story.user_id != current_user.id:
        return {'errors': f"Forbidden, Story {story.id} is not created by the current user."}, 403
    payload= request.get_json()
    storyimagebyid.image_url=payload['image_url']
    db.session.commit()
    return jsonify(storyimagebyid.to_dict())

# Delete a storyimage
# Require Authentication: true
# DELETE /api/stories/images/:imageId
@storyimage_routes.route('/images/<int:imageId>', methods=['DELETE'])
@login_required
def delete_storyimage(imageId):
    storyimagebyid = Storyimage.query.get(imageId)
    if not storyimagebyid:
        return {'errors': f"Storyimage {imageId} does not exist."}, 404
    # checks if storyimage is created by the current user
    story = Story.query.get(storyimagebyid.story_id)
    if story.user_id != current_user.id:
        return {'errors': f"Forbidden, Storyimage {storyimagebyid.id} of Story {story.id} is not created by the current user."}, 403
    db.session.delete(storyimagebyid)
    db.session.commit()
    # return jsonify({'message': 'Successfully deleted'})
    return jsonify(storyimagebyid.to_dict())
