import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config
from database.db import db
from routes.auth import auth
from routes.data_source import data_source

app = Flask(__name__)

# Load Configuration
app.config.from_object(Config)

# Create Upload Folder if it doesn't exist
os.makedirs(
    app.config["UPLOAD_FOLDER"],
    exist_ok=True
)

# Initialize Extensions
jwt = JWTManager(app)
CORS(app)
db.init_app(app)

# Create Database Tables
with app.app_context():
    db.create_all()

# Register Blueprints
app.register_blueprint(auth)
app.register_blueprint(data_source)


@app.route("/")
def home():
    return {
        "success": True,
        "message": "Welcome to Data Analysis App API"
    }
# Run Application
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)