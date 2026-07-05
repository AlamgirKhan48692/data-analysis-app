from flask import Blueprint, jsonify

dataset = Blueprint("dataset", __name__)

@dataset.route("/dataset")
def dataset_info():
    return jsonify({
        "message": "Dataset API"
    })