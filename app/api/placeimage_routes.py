from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Placeimage, Place
from ..forms.placeimage_form import PlaceImageForm

placeimage_routes = Blueprint('placeimages', __name__)

#Get all the placeimages
### Require Authentication: false
### `GET /api/places/images`
@placeimage_routes.route('/images')
def get_all_placeimages():
    """
    Query for all placeimages and returns them in a list of placeimages dictionaries
    """
    placeimages = Placeimage.query.all()
    return {'placeimages': [placeimage.to_dict() for placeimage in placeimages]}

#Get all the images of a place by id
### Require Authentication: false
### `GET /api/places/:placeId/images`
@placeimage_routes.route('/<int:placeId>/images')
def get_imagesof_place(placeId):
    """
    Query for all the images of a place by id and returns them in a list of placeimages dictionaries
    """
    placeimages = Placeimage.query.filter(Placeimage.place_id == placeId)
    place = Place.query.get(placeId)
    if(not place):
        return {'errors': f"place {placeId} does not exist."}, 404
    # return jsonify(placeimages.to_dict())
    return jsonify({'placeimages': [placeimage.to_dict() for placeimage in placeimages]})

# Create an image to a place
# Require Authentication: true
# POST /api/places/:placeId/images
@placeimage_routes.route('/<int:placeId>/images', methods=['POST'])
@login_required
def post_placeimage(placeId):
     # checks if place is created by the current user
    place = Place.query.get(placeId)
    if place.user_id != current_user.id:
        return {'errors': f"Forbidden, Place {place.id} is not created by the current user."}, 403
    """
    Creates and returns a new placeimage in a dictionary.
    """
    form = PlaceImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_placeimage = Placeimage(
            place_id=placeId,
            image_url= form.data['image_url'],
        )

        db.session.add(new_placeimage)
        db.session.commit()

        return jsonify(new_placeimage.to_dict()), 201  # HTTP status code for Created
    return form.errors, 401

# Edit a placeimage
# Updates and returns an existing image.
# Require Authentication: true
# Require proper authorization: Place must be created by the current user
# PUT /api/places/images/:imageId
@placeimage_routes.route('/<int:imageId>', methods=['PUT'])
@login_required
def edit_placeimage(imageId):
    placeimagebyid = Placeimage.query.get(imageId)
    if not placeimagebyid:
        return {'errors': f"Placeimage {imageId} does not exist."}, 404
    # checks if place is created by the current user
    place = Place.query.get(placeimagebyid.place_id)
    if place.user_id != current_user.id:
        return {'errors': f"Forbidden, Place {place.id} is not created by the current user."}, 403
    payload= request.get_json()
    placeimagebyid.image_url=payload['image_url']
    db.session.commit()
    return jsonify(placeimagebyid.to_dict())

# Delete a placeimage
# Require Authentication: true
# DELETE /api/places/images/:imageId
@placeimage_routes.route('/images/<int:imageId>', methods=['DELETE'])
@login_required
def delete_placeimage(imageId):
    placeimagebyid = Placeimage.query.get(imageId)
    if not placeimagebyid:
        return {'errors': f"Placeimage {imageId} does not exist."}, 404
    # checks if placeimage is created by the current user
    place = Place.query.get(placeimagebyid.place_id)
    if place.user_id != current_user.id:
        return {'errors': f"Forbidden, Place {place.id} is not created by the current user."}, 403
    db.session.delete(placeimagebyid)
    db.session.commit()
    # return jsonify({'message': 'Successfully deleted'})
    return jsonify(placeimagebyid.to_dict())
