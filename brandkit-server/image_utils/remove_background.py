import requests

def remove_background_from_image_and_get_new_url(image_url, picsart_api_key):
    picsart_api_url = 'https://api.picsart.io/tools/1.0/removebg'
    try:
        headers = {
            'accept': 'application/json',
            'x-picsart-api-key': picsart_api_key,
        }
        data = {
            'output_type': 'cutout',
            'format': 'PNG',
            'image_url': image_url,
        }
        response = requests.post(picsart_api_url, headers=headers, data=data)
        response_data = response.json()
        
        if response.status_code == 200:
            return response_data['data']['url']
        else:
            print(f'Failed to remove background. Error: {response.text}')
            return None
    except Exception as error:
        print(f'Error in removeBackgroundFromImage: {error}')
        return None 