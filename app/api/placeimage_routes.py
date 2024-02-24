from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Placeimage, Place
from ..forms.placeimage_form import PlaceImageForm

placeimage_routes = Blueprint('placeimages', __name__)

#Get all the placeimages
### Require Authentication: false
### `GET /api/places/images`
@placeimage_routes.route('/')
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
    placeimages = Placeimage.query.get(placeId)
    place = Place.query.get(placeId)
    if(not place):
        return {'errors': f"place {placeId} does not exist."}, 404
    return {'placeimages': [placeimage.to_dict() for placeimage in placeimages]}
