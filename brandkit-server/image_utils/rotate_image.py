import requests
from PIL import Image
from io import BytesIO

def rotate_image(image_url, rotation_angle):
    # try:
        response = requests.get(image_url)
        img = Image.open(BytesIO(response.content))
        rotated_img = img.rotate(angle=rotation_angle, expand=True)
        rotated_img_bytes = BytesIO()
        rotated_img.save(rotated_img_bytes, format='PNG')
        return rotated_img_bytes.getvalue()
    # except Exception as e:
    #     print('EXCEPTIONNNNNN')
    #     print(e)
    #     return