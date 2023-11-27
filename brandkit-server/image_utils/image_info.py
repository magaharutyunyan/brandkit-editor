import cv2
import numpy as np
import requests
from sklearn.cluster import KMeans
import os

def read_image(source):
    if source.startswith(('http:', 'https:')):
        # Fetch image from URL
        print(f"Fetching image from URL: {source}")
        resp = requests.get(source)
        if resp.status_code != 200:
            print(f"Failed to retrieve image from URL {source}. HTTP Status Code: {resp.status_code}")
            return None
        image = np.asarray(bytearray(resp.content), dtype="uint8")
        image = cv2.imdecode(image, cv2.IMREAD_COLOR)
    else:
        # Load image from local file
        if not os.path.exists(source):
            print(f"File not found: {source}")
            return None
        image = cv2.imread(source)
        if image is None:
            print(f"Failed to read image from file: {source}")
            return None

    return image  # This line should be indented back so it's outside the if/else block

def rgb_to_hex(rgba):
    if len(rgba) == 4:
        return "#{:02x}{:02x}{:02x}{:02x}".format(int(rgba[0]), int(rgba[1]), int(rgba[2]), int(rgba[3]))
    elif len(rgba) == 3:
        return "#{:02x}{:02x}{:02x}".format(int(rgba[0]), int(rgba[1]), int(rgba[2]))
    else:
        raise ValueError("Input rgba array must have 3 or 4 elements.")

def get_dominant_colors(image, num_colors=3, alpha_threshold=200, default_color="#FFFFFF"):
    try:
        # Check if the image is grayscale
        if len(image.shape) < 3 or image.shape[2] < 3:
            print(f"Image does not have multiple color channels or is not a valid image: {image.shape}")
            return [default_color]  # Return the default color in a list

        # Convert to RGBA if the image is in RGB
        if image.shape[2] == 3:
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGBA)

        # Filter out pixels based on alpha_threshold
        filtered_pixels = image[image[:, :, 3] > alpha_threshold]

        # If no pixels remain after filtering, just return the dominant colors of the original image
        pixels_to_use = filtered_pixels if len(filtered_pixels) > 0 else image

        pixels = pixels_to_use.reshape(-1, 4)  # Reshape based on the number of channels, assuming 4 channels (RGBA)
        unique_pixels = np.unique(pixels, axis=0)
        n_clusters = min(len(unique_pixels), num_colors)  # Update the number of clusters based on unique pixels

        kmeans = KMeans(n_clusters=n_clusters, n_init=10)
        kmeans.fit(unique_pixels)  # Use unique_pixels instead of pixels to remove duplicate points
        colors = kmeans.cluster_centers_
        hex_colors = [rgb_to_hex(color.round(0).astype(int)) for color in colors]

        return hex_colors

    except Exception as e:
        print(f"An error occurred: {e}")
        return [default_color]



def get_image_size(image):
    print(f"get_image_size called")  # Debugging print statement
    if isinstance(image, str):
        print(f"Error: Expected image object, got string: {image}")
        return '0x0'
    h, w, _ = image.shape
    return f"{w}x{h}"


def get_image_info(path):
    print(f"get_image_info called")  # Debugging print statement
    image = read_image(path)
    if image is not None:
        size_info = get_image_size(image)
        dominant_colors = get_dominant_colors(image)  # Get dominant colors
        return size_info, dominant_colors
    return '', []
