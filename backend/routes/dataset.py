from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

dataset = Blueprint("dataset", __name__)


@dataset.route("/dataset", methods=["GET"])
@jwt_required()
def dataset_info():

    user_id = get_jwt_identity()

    return jsonify({
        "success": True,
        "message": "Dataset API",
        "user_id": user_id
    }), 200