from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token

from database.db import db
from models.user import User

auth = Blueprint("auth", __name__)


@auth.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    hash_password = generate_password_hash(password)

    if not username:
        return jsonify({
            "success": False,
            "message": "UserName is Required"
        }), 400

    if not email:
        return jsonify({
            "success": False,
            "message": "Email is Required"
        }), 400

    if not password:
        return jsonify({
            "success": False,
            "message": "Password is Required"
        }), 400

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({
            "success": False,
            "message": "Email already exists."
        }), 409

    user = User(
        username=username,
        email=email,
        password=hash_password
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "User Registered Successfully"
    }), 201


@auth.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email:
        return jsonify({
            "success": False,
            "message": "Email Required"
        }), 400

    if not password:
        return jsonify({
            "success": False,
            "message": "Password Required"
        }), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({
            "success": False,
            "message": "User Not Found"
        }), 404

    if check_password_hash(user.password, password):

        access_token = create_access_token(identity=str(user.id))

        return jsonify({
            "success": True,
            "message": "Login Successful",
            "token": access_token,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            }
        }), 200

    return jsonify({
        "success": False,
        "message": "Login Failed"
    }), 401