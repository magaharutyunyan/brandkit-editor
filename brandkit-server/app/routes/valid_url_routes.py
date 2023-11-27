from flask import Blueprint, request, jsonify
from dotenv import load_dotenv
import os

from image_utils import process_and_open_image_from_request, upload_to_picsart_and_get_url\

load_dotenv()

bp = Blueprint('valid_url', __name__)

@bp.route('/valid_url', methods=['POST'])
def valid_url_endpoint():
    image = process_and_open_image_from_request(request)
    if image:
        auth_token = os.environ['AUTH_TOKEN']
        image_url = upload_to_picsart_and_get_url(image, auth_token)
        if image_url:
            response = jsonify(image_url)
            response.headers.add('Access-Control-Allow-Origin', '*')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
            return response
        else:
            return jsonify({'error': 'Failed to upload image to PicsArt.'}), 500
    else:
        return jsonify({'error': 'Invalid request. Missing file or base64_url parameter.'}), 400


