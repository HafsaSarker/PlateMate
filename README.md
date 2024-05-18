# PlateMate
A dating app that matches users based on food, location, and restaurant preferences using Google Maps, Geolocation, and Yelp Fusion APIs.

## Features

- Real-time chatting
- Restaurant selection
- User matching
  - Machine learning algorithms
  - User preferences
- Customizable profile
- User authentication

## Installation

1. Clone this repo using `git clone` command

### Run client

1. `cd client`
2. create the env file in client directory with:
   - VITE_MAPS_API - google maps api key
   - VITE_MAP_ID - google maps api ID
   - VITE_BACKEND_URL - backend url 
3. `npm i`
4. `npm run dev` to get localhost server running

### Run typescript server

1. Open a new terminal
2. `cd server`
3. create the env file in server directory with:
  - YELP_API_KEY
  - MONGO_URI
  - SECRET
  - AWS_BUCKET_NAME
  - AWS_BUCKET_REGION
  - AWS_ACCESS_KEY
  - AWS_SECRET_ACCESS_KEY
   (with Secret key, Mongo url, yelp api key, and aws bucket name, region, access key and secret access key)
4. `npm i`
5. `npm start` to get server running

### Run server2 (for ML recommended users)

1. Open a new terminal (make sure you have python3 installed)
2. `cd server2`
3. create the env file in server2 directory with:
  - MONGO_URI
4. `python -m venv venv` to create virtual environment
5. `venv\Scripts\activate` to activate virtual environment (or `source venv/bin/activate` on macOS/Linux)
6. install required packages by `pip install flask flask-cors pymongo pandas scikit-learn python-dotenv certifi`
7. `python app.py` to start flask app
8. run `deactivate` to return to system's default Python environment
