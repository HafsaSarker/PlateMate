# Getting started

1. Clone this repo using `git clone` command

# Run client

1. `cd client`
2. create the env file in client directory (with Google Map API key and ID)
3. `npm i`
4. `npm run dev` to get localhost server running

# Run typescript server

1. Open a new terminal
2. `cd server`
3. create the env file in server directory (with Secret key, Mongo url, yelp api key, and aws bucket name, region, access key and secret access key)
4. `npm i`
5. `npm start` to get server running

# Run server2 (for ML recommended users)

1. Open a new terminal (make sure you have python3 installed)
2. `cd server2`
3. create the env file in server2 directory (with Mongo url)
4. `python -m venv venv` to create virtual environment
5. `venv\Scripts\activate` to activate virtual environment (or `source venv/bin/activate` on macOS/Linux)
6. install required packages by `pip install flask flask-cors pymongo pandas scikit-learn python-dotenv certifi`
7. `python app.py` to start flask app
8. run `deactivate` to return to system's default Python environment
