from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Like

like_routes = Blueprint('likes', __name__)

# Get all the Likes
@like_routes.route('/likes')
def get_all_likes():
    """
    Query for all likes
    """
    likes = Like.query.all()

    return jsonify({'likes': [like.to_dict() for like in likes]})

# Get all Likes of a story
# Require Authentication: false
# GET /api/stories/:id/likes
@like_routes.route('/<int:id>/likes')
def get_likes(id):
    """
    Query for all the likes of a story by story_id.
    """
    likes = Like.query.filter(Like.story_id==id).all()

    #return number of likes of a story by id
    # numoflikes = likes.count()
    # return jsonify(numoflikes)
    return jsonify({'likes': [like.to_dict() for like in likes]})

# Like or unlike a story
# A logged in user can like or unlike a story with visible confirmation without causing a refresh/redirect.
# POST /api/stories/:id/likes
# DELETE /api/stories/:id/likes
@like_routes.route('/<int:id>/likes', methods=['POST', 'DELETE'])
@login_required
def post_like(id):
    """
    Creates and returns a new like.
    """
    likebycurrent = Like.query.filter(Like.story_id==id).filter(Like.user_id==current_user.get_id())
    if likebycurrent.count() == 0 and (request.method == 'POST' or request.method == 'DELETE'):
        new_like = Like(user_id=current_user.id,story_id=id)
        db.session.add(new_like)
        db.session.commit()
        return jsonify(new_like.to_dict())
    elif likebycurrent.count() == 1 and (request.method == 'DELETE' or request.method == 'POST'):
        deletelike = likebycurrent.first()
        db.session.delete(likebycurrent.first())
        db.session.commit()
        # return {'message': 'Delete successful.'}
        return jsonify(deletelike.to_dict())
    else:
        return
