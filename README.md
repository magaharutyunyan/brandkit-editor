# Brandkit-Editor


## Introduction
 The BrandKit Editor is designed for enhancing and customizing existing BrandKits. Users can perform various actions to manage and refine the visual elements of a BrandKit.


## BrandKit Editor Features
## Image Upload
Users can easily upload images to the BrandKit by either selecting files from their device or providing URLs. This feature allows for seamless integration of new visual assets.

## Image Management
The BrandKit Editor empowers users to organize and manage images within the BrandKit efficiently. This includes the ability to reorder images, group them logically, and categorize them based on specific criteria.

## Image Editing
To further customize visual elements, users have access to basic image editing capabilities. These include cropping, rotating, and the option to remove the background of images. These editing tools provide flexibility in tailoring the visual components of the BrandKit to specific preferences.


## Prerequisites
Before you begin, ensure that you have the following installed:

Python: [Install Python](https://www.python.org/downloads/)

Node.js and npm: [Install Node.js and npm](https://nodejs.org/)


## Getting Started
1. Clone the repository:

```
git clone https://gitlab.com/margarita.harutyunyan/brandkit-editor.git
cd brandkit
```

## Before Running!
If your brandkit json contains image paths instead of URLs, follow the steps below:

1. Set the necessary environment variables in the .env file:
```
AUTH_TOKEN = "your auth token"

PA_API_KEY = "picsart api key"

JSON_WITHOUT_URL = "path to your brandkit json

IMAGE_FOLDER = "path to the folder containing brandkit images"
```

2. Navigate to the **brandkit_utils** directory in **brandkit-server**:

`cd brandkit-server/brandkit_utils`

3. Install Python dependencies:

`pip install -r requirements.txt`

4. Run the **reset_brandkit.py** file and wait a little (You can also run this file when you want to completely reset your brandkit and cancel all the changes you made):

`python3 reset_brandkit.py`

After this step you can proceed with running the application.

## brandkit-server
1. Navigate to the brandkit-server folder:

`cd brandkit-server`


2. Install Python dependencies (ignore this step if you did that in the previous phase):

`pip install -r requirements.txt`


3. Fill in the **.env** file with the necessary environment variables (fill those you haven't yet after the previous phase):

```
AUTH_TOKEN = "your auth token"

PA_API_KEY = 'picsart api key' 

FOLDER_PATH = 'path to your brandkit folder'

JSON_FILE_PATH = 'path to your brandkit json'
```


4. Run the server:

`python3 run.py`


This will start the backend server.


## brandkit-ui
1. Open a new terminal window (while keeping the previous one open).

2. Navigate to the brandkit-editor folder:

`cd ../brandkit-editor`


3. Install Node.js dependencies:

`npm install`


4. Run the React app:

`npm start`


This will launch the React app in your default web browser.

## Accessing the Application
Once both components are running, you can access the application by opening your web browser and navigating to http://localhost:3000.

## Notes
- Ensure that the specified ports (e.g., 3000 for React app) are not in use by other applications.
- If you encounter any issues during installation or setup, refer to the documentation of Python and Node.js for troubleshooting.

Now you should have the BrandKit project up and running!
