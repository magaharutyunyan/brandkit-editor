from flask import Flask
from flask_cors import CORS
# from flask_ngrok import run_with_ngrok

app = Flask(__name__)
# run_with_ngrok(app)
CORS(app, origins=['http://localhost:3000'], supports_credentials=True)

from app.routes import initial_view_routes, remove_background_routes, rotate_image_routes, save_brandkit_routes, valid_url_routes

url_prefix = '/brandkit_api'
app.register_blueprint(initial_view_routes.bp, url_prefix=url_prefix)
app.register_blueprint(remove_background_routes.bp, url_prefix=url_prefix)
app.register_blueprint(rotate_image_routes.bp, url_prefix=url_prefix)
app.register_blueprint(save_brandkit_routes.bp, url_prefix=url_prefix)
app.register_blueprint(valid_url_routes.bp, url_prefix=url_prefix)

