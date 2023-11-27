import json
import time
import requests
from dotenv import load_dotenv
import os

load_dotenv()

# file_path = os.environ['JSON_FILE_PATH']
JSON_WITHOUT_URL = os.environ['JSON_WITHOUT_URL']
IMAGE_FOLDER = os.environ['IMAGE_FOLDER']
AUTH_TOKEN = os.environ['AUTH_TOKEN']
PA_API_KEY = os.environ['PA_API_KEY']

def upload_image(image_path, id):
    url = f"https://ai.picsart.com/photos/{id}"
    image = None
    print('Initial image path:', image_path)
    print('Initial id:', id)

   
    image = open(image_path, 'rb')
    
    files = {
        'image': ('image.png', image)

    }
    headers = {
        'Authorization': f'Bearer {AUTH_TOKEN}'
    }
    response = requests.post(url, files=files, headers=headers)
    
    if response.ok:
        obj = response.json()
        if obj and obj.get('data'):
            return obj['data']['url']
    else:
        print(f'Error in uploadImage: {response.text}')
    return None

with open(JSON_WITHOUT_URL, 'r') as file:
    print('opened')
    brandkit_json = json.load(file)
    for category in ['backgroundImages', 'images', 'logos']:
            # ls = []
            path_list = brandkit_json['brandkit']['adInfo'][category]
            for image_item in path_list:
                doc_id = "your-document-id"
                timestamp = int(time.time() * 1000)  # Convert to milliseconds
                unique_image_name = f"{doc_id}_{timestamp}.png"
    
                image_url = upload_image(IMAGE_FOLDER + image_item['pathOrURL'], unique_image_name)
                image_item['pathOrURL'] = image_url

            # brandkit_json['brandkit']['adInfo'][category] = ls
            print(f'{category} is done!')
    
print('new brandkit', brandkit_json)
with open(JSON_WITHOUT_URL[:-5] + '_with_url' + JSON_WITHOUT_URL[-5:], 'w') as file:
    json.dump(brandkit_json, file)

