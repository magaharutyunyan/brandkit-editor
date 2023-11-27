import os
from pprint import pprint
import requests
import time
import json

def get_initial_view(json_file_path):
    # result = []
    with open(json_file_path, 'r') as file:
        brandkit_json = json.load(file)
        result = [brandkit_json['brandkit']['adInfo'][category] for category in ['logos', 'images', 'backgroundImages']]
        # print('result:', result)
        # for category in ['logos', 'images', 'backgroundImages']:
        #     ls = []
        #     for image in brandkit_json['brandkit']['adInfo'][category]:
        #         ls.append(image['pathOrURL'])
        #     result.append(ls)
            # print('ls', ls)
        # print(result)
        return result
