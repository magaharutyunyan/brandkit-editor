from flask import Blueprint

bp = Blueprint('routes', __name__)

from . import initial_view_routes, remove_background_routes, rotate_image_routes, save_brandkit_routes, valid_url_routes