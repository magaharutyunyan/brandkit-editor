from flask import Blueprint, request, jsonify
from dotenv import load_dotenv
import os

from brandkit_utils import save_brandkit

bp = Blueprint('save_brandkit', __name__)

@bp.route('/save_brandkit', methods=['POST'])
def save_brandkit_endpoint():
    data = request.get_json()

    new_brandkit = {
            'logos': data.get('logos', []),
            'images': data.get('images', []),
            'backgroundImages': data.get('backgroundImages', [])
    }

    json_file_path = os.environ['JSON_FILE_PATH']
    save_brandkit(new_brandkit, json_file_path)

    return jsonify({"message": "Data received and processed succeassfully"})
