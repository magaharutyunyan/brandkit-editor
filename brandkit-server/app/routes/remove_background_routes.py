from flask import Blueprint, request, jsonify
from dotenv import load_dotenv
import os

from image_utils import remove_background_from_image_and_get_new_url

load_dotenv()

bp = Blueprint('remove_background', __name__)


@bp.route('/remove_background', methods=['POST'])
def remove_background_endpoint():
    data = request.get_json()
    if 'src' in data:
        image_url = data['src']

        # Call the removebg function to process the image and get the new image URL
        pa_api_key = os.environ['PA_API_KEY']
        new_image_url = remove_background_from_image_and_get_new_url(image_url, pa_api_key)
        if new_image_url:
            response_data = {'new_image_url': new_image_url}
            response = jsonify(response_data)
            # response.headers.add('Access-Control-Allow-Origin', '*')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
            return response
        else: return jsonify({'error': 'Failed to remove background'}), 500
    return jsonify({'error': 'Image source not provided in the request.'}), 400
