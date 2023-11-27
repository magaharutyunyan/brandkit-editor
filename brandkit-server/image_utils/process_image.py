import base64
from io import BytesIO

def process_and_open_image_from_request(request):
    image = None
    if 'file' in request.files:
        image = request.files['file']
    elif 'base64_url' in request.form:
        base64_url =request.form['base64_url']
        image_data = base64.b64decode(base64_url.split(',')[1],)
        image = BytesIO(image_data)
    return image


