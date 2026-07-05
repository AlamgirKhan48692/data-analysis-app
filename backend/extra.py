# ============================================
# IMPORTS
# ============================================

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


# ============================================
# FLASK APP
# ============================================

app = Flask(__name__)
CORS(app)


# ============================================
# CONFIGURATION
# ============================================

app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql+pymysql://root:@localhost/data_analysis"
)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


# ============================================
# DATABASE
# ============================================

db = SQLAlchemy(app)


# ============================================
# USER MODEL (TABLE)
# ============================================

class User(db.Model):

    __tablename__ = "users"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    username = db.Column(
        db.String(100),
        nullable=False
    )

    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    password = db.Column(
        db.String(255),
        nullable=False
    )


# ============================================
# CREATE DATABASE TABLES
# ============================================

with app.app_context():
    db.create_all()


# ============================================
# HOME ROUTE
# ============================================

@app.route("/")
def home():

    return jsonify({
        "message": "Welcome to Flask Backend"
    })


# ============================================
# REGISTER API
# ============================================

@app.route("/register", methods=["POST"])
def register():

    # Receive JSON data from React
    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")


    # Validation
    if not username or not email or not password:

        return jsonify({
            "success": False,
            "message": "All fields are required."
        }), 400


    # Check existing user
    existing_user = User.query.filter_by(
        email=email
    ).first()


    if existing_user:

        return jsonify({
            "success": False,
            "message": "Email already exists."
        }), 409


    # Create User Object
    user = User(
        username=username,
        email=email,
        password=password
    )


    # Save User
    db.session.add(user)
    db.session.commit()


    return jsonify({
        "success": True,
        "message": "User Registered Successfully"
    }), 201


# ============================================
# DATASET API
# ============================================

@app.route("/dataset")
def dataset():

    return jsonify({
        "message": "Dataset API"
    })


# ============================================
# RUN APPLICATION
# ============================================

if __name__ == "__main__":
    app.run(debug=True)