import time
import requests

def upload_to_picsart_and_get_url(image, auth):
    files = {'image': ('image.png', image)}
    doc_id = "stupid_horse"
    timestamp = int(time.time() * 1000)
    id = f"{doc_id}_{timestamp}.png"
    url = f"https://ai.picsart.com/photos/{id}"
    headers = {'Authorization': f'Bearer {auth}'}
    response = requests.post(url, files=files, headers=headers)
    if response.ok:
        obj = response.json()
        if obj and obj.get('data'):
            image_url = obj['data']['url']
            return image_url
    print('Error when uploading image to PicsArt:', response.text)

