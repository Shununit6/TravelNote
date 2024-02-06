from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Place
from ..forms.place_form import PlaceForm

place_routes = Blueprint('places', __name__)

#Get all the places
### Require Authentication: false
### `GET /api/places`
@place_routes.route('/')
def get_all_places():
    """
    Query for all places and returns them in a list of place dictionaries
    """
    places = Place.query.all()
    return {'places': [place.to_dict() for place in places]}

### Get all places created by the Current User
###  Require Authentication: true
###  `GET /api/places/current`
@place_routes.route('/current')
@login_required
def get_current_places():
    """
    Query for all the places that are created by the Current User and returns them in a list of place dictionaries
    """
    current_places = Place.query.filter_by(user_id=current_user.id).all()
    return jsonify({'places': [place.to_dict() for place in current_places]})

# Get details of a place from an id
# Require Authentication: false
# GET /api/places/:placeId
@place_routes.route('/<int:placeId>')
def get_places_by_id(placeId):
    """
    Query for the details of a place specified by its id and returns that place in a dictionary.
    """
    place = Place.query.get(placeId)
    if(not place):
        return {'errors': f"place {placeId} does not exist."}, 404
    return jsonify(place.to_dict())

# Create a place
# Require Authentication: true
# POST /api/places
@place_routes.route('/', methods=['POST'])
@login_required
def post_place():
    """
    Creates and returns a new place in a dictionary.
    """
    form = PlaceForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_place = Place(
            user_id=current_user.id,
            name=form.data['name'],
            number_traveler=form.data['number_traveler'],
            private = form.data['private'],
            city=form.data['city'],
            country=form.data['country'],
            start_date=form.data['start_date'],
            end_date=form.data['end_date']
        )

        db.session.add(new_place)
        db.session.commit()

        return jsonify(new_place.to_dict()), 201  # HTTP status code for Created
    return form.errors, 401



# Edit a Place
# Updates and returns an existing place.
# Require Authentication: true
# Require proper authorization: Place must be created by the current user
# PUT /api/places/:placeId
@place_routes.route('/<int:placeId>', methods=['PUT'])
@login_required
def edit_place(placeId):
    placebyid = Place.query.get(placeId)
    if not placebyid:
        return {'errors': f"Place {placeId} does not exist."}, 404
    # checks if place is created by the current user
    if placebyid.user_id != current_user.id:
        return {'errors': f"Forbidden, Place {placeId} is not created by the current user."}, 403
    payload= request.get_json()
    placebyid.name=payload['name']
    placebyid.number_traveler=payload['number_traveler']
    placebyid.private=payload['private']
    placebyid.city=payload['city']
    placebyid.country=payload['country']
    placebyid.start_date=payload['start_date']
    placebyid.end_date=payload['end_date']
    db.session.commit()
    return jsonify(placebyid.to_dict())


# Delete a place
# Deletes an existing place: A logged in user may delete one of their own places, removing it from the list of visible Places without causing a refresh/redirect.
# Require Authentication: true
# Require proper authorization: Place must be created by the current user
# DELETE /api/places/:placeId
@place_routes.route('/<int:placeId>', methods=['DELETE'])
@login_required
def delete_place(placeId):
    placebyid = Place.query.get(placeId)
    if not placebyid:
        return {'errors': f"Place {placeId} does not exist."}, 404
    # checks if place is created by the current user
    if placebyid.user_id != current_user.id:
        return {'errors': f"Forbidden, Place {placeId} is not created by the current user."}, 403
    db.session.delete(placebyid)
    db.session.commit()
    return jsonify({'message': 'Successfully deleted'})
