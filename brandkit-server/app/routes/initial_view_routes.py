from flask import Blueprint, jsonify
import os
from brandkit_utils import get_initial_view
from pprint import pprint
from dotenv import load_dotenv
load_dotenv()

bp = Blueprint('initial_view', __name__)

@bp.route('/initial_view', methods=['GET'])
def initial_view_endpoint():
    json_file_path = os.environ['JSON_FILE_PATH']
    view = get_initial_view(json_file_path)
    # pprint(view)
    response = jsonify(view)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response