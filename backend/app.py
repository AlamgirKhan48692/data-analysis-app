from flask import Flask
from flask_cors import CORS
from routes.auth import auth
from routes.dataset import dataset
from config import Config
from database.db import db

app = Flask(__name__)

app.config.from_object(Config)

CORS(app)

db.init_app(app)
with app.app_context():
    db.create_all()

app.register_blueprint(auth)
app.register_blueprint(dataset)

if __name__ == "__main__":
    app.run(debug=True)