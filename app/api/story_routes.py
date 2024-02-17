from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Story
from ..forms.story_form import StoryForm

story_routes = Blueprint('stories', __name__)

#Get all the stories
### Require Authentication: false
### `GET /api/stories`
@story_routes.route('/')
def get_all_stories():
    """
    Query for all stories and returns them in a list of story dictionaries
    """
    stories = Story.query.all()
    return {'stories': [story.to_dict() for story in stories]}

### Get all stories created by the Current User
###  Require Authentication: true
###  `GET /api/stories/current`
@story_routes.route('/current')
@login_required
def get_current_stories():
    """
    Query for all the stories that are created by the Current User and returns them in a list of story dictionaries
    """
    current_stories = Story.query.filter_by(user_id=current_user.id).all()
    return jsonify({'stories': [story.to_dict() for story in current_stories]})

# Get details of a story from an id
# Require Authentication: false
# GET /api/stories/:storyId
@story_routes.route('/<int:storyId>')
def get_stories_by_id(storyId):
    """
    Query for the details of a story specified by its id and returns that story in a dictionary.
    """
    story = Story.query.get(storyId)
    if(not story):
        return {'errors': f"Story {storyId} does not exist."}, 404
    return jsonify(story.to_dict())

# Create a story
# Require Authentication: true
# POST /api/stories
@story_routes.route('/', methods=['POST'])
@login_required
def post_story():
    """
    Creates and returns a new story in a dictionary.
    """
    form = StoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # return form.validate_on_submit()
    if form.validate_on_submit():
        new_story = Story(
            user_id=current_user.id,
            title=form.data['title'],
            description=form.data['description'],
            article_url = form.data['article_url'],
            shorts_url=form.data['shorts_url']
        )

        db.session.add(new_story)
        db.session.commit()

        return jsonify(new_story.to_dict()), 201  # HTTP status code for Created
    return form.errors, 401



# Edit a Story
# Updates and returns an existing story.
# Require Authentication: true
# Require proper authorization: Story must be created by the current user
# PUT /api/stories/:storyId
@story_routes.route('/<int:storyId>', methods=['PUT'])
@login_required
def edit_story(storyId):
    storybyid = Story.query.get(storyId)
    if not storybyid:
        return {'errors': f"Story {storyId} does not exist."}, 404
    # checks if story is created by the current user
    if storybyid.user_id != current_user.id:
        return {'errors': f"Forbidden, Story {storyId} is not created by the current user."}, 403
    payload= request.get_json()
    storybyid.title=payload['title']
    storybyid.description=payload['description']
    storybyid.article_url=payload['article_url']
    storybyid.shorts_url=payload['shorts_url']
    db.session.commit()
    return jsonify(storybyid.to_dict())


# Delete a story
# Deletes an existing story: A logged in user may delete one of their own stories, removing it from the list of visible stories without causing a refresh/redirect.
# Require Authentication: true
# Require proper authorization: Story must be created by the current user
# DELETE /api/stories/:storyId
@story_routes.route('/<int:storyId>', methods=['DELETE'])
@login_required
def delete_story(storyId):
    storybyid = Story.query.get(storyId)
    if not storybyid:
        return {'errors': f"Story {storyId} does not exist."}, 404
    # checks if story is created by the current user
    if storybyid.user_id != current_user.id:
        return {'errors': f"Forbidden, Story {storyId} is not created by the current user."}, 403
    db.session.delete(storybyid)
    db.session.commit()
    return jsonify({'message': 'Successfully deleted'})
