from flask import Blueprint, request, jsonify
import os
from dotenv import load_dotenv

from image_utils import upload_to_picsart_and_get_url, rotate_image

load_dotenv()

bp = Blueprint('rotate_image', __name__)

@bp.route('/rotate_image', methods=['POST'])
def rotate_image_endpoint():
    data = request.form

    image_url = data.get('image_url')
    rotation_angle = -float(data.get('rotation_angle'))

    if rotation_angle == 0:
        return jsonify({'rotated_image_url', image_url})

    if not image_url or not rotation_angle:
        return jsonify({'error': 'Missing image_url or rotation_angle'}), 400
    
    rotated_image_data = rotate_image(image_url, rotation_angle)
    if rotated_image_data:
        auth_token = os.environ['AUTH_TOKEN']
        rotated_image_url = upload_to_picsart_and_get_url(rotated_image_data, auth_token)
        if rotated_image_url:
            return jsonify({'rotated_image_url': rotated_image_url})
    return jsonify({'error': 'Failed to save the rotated image'})

  

