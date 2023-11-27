import os
import json

from image_utils import get_image_info

def save_brandkit(update_dict, json_file_path):
    for category in update_dict:
        category_list = []
        for image_data in update_dict[category]:
                if not (image_data['size'] or image_data['dominantColors']):
                    image_data['size'], image_data['dominant_colors'] = get_image_info(image_data['pathOrURL'])
                category_list.append(image_data)
        update_dict[category] = category_list
    
    if os.path.exists(json_file_path):
        with open(json_file_path, 'r') as file:
            brandkit_json = json.load(file)
            for category in update_dict:
                brandkit_json['brandkit']['adInfo'][category] = update_dict[category]

        with open(json_file_path, 'w') as file:
            json.dump(brandkit_json, file)