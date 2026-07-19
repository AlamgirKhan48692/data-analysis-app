from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from database.db import db
from models.data_source import DataSource

from services.file_validator import validate_file
from services.file_storage import save_file
from services.file_reader import read_file
from services.data_profiler import profile_dataset

data_source = Blueprint("data_source", __name__)


@data_source.route("/dataset", methods=["GET"])
@jwt_required()
def dataset_info():
    """
    Get all datasets uploaded by the logged-in user.
    """

    user_id = get_jwt_identity()

    datasets = (
        DataSource.query
        .filter_by(user_id=user_id)
        .order_by(DataSource.created_at.desc())
        .all()
    )

    dataset_list = []

    for dataset in datasets:
        dataset_list.append({
            "id": dataset.id,
            "name": dataset.name,
            "source_type": dataset.source_type,
            "original_filename": dataset.original_filename,
            "file_extension": dataset.file_extension,
            "rows": dataset.rows,
            "columns": dataset.columns,
            "status": dataset.status,
            "created_at": dataset.created_at
        })

    return jsonify({
        "success": True,
        "datasets": dataset_list
    }), 200


@data_source.route("/upload", methods=["POST"])
@jwt_required()
def upload_dataset():
    """
    Upload a dataset, analyze it and save its metadata.
    """

    try:

        # Logged-in user
        user_id = get_jwt_identity()

        # Check uploaded file
        if "file" not in request.files:
            return jsonify({
                "success": False,
                "message": "No file uploaded."
            }), 400

        file = request.files["file"]

        # Validate file
        is_valid, message = validate_file(file)

        if not is_valid:
            return jsonify({
                "success": False,
                "message": message
            }), 400

        # Save file
        file_info = save_file(file, user_id)

        # Read dataset
        dataframe = read_file(
            file_info["storage_path"]
        )

        # Analyze dataset
        profile = profile_dataset(dataframe)

        # Save metadata into PostgreSQL
        dataset = DataSource(
            user_id=user_id,
            name=file_info["original_filename"],
            source_type="file",
            original_filename=file_info["original_filename"],
            stored_filename=file_info["stored_filename"],
            file_extension=file_info["file_extension"],
            mime_type=file_info["mime_type"],
            file_size=file_info["file_size"],
            rows=profile["shape"]["rows"],
            columns=profile["shape"]["columns"],
            storage_path=file_info["storage_path"],
            status="uploaded"
        )

        db.session.add(dataset)
        db.session.commit()

        return jsonify({
            "success": True,
            "message": "Dataset uploaded successfully.",
            "dataset": {
                "id": dataset.id,
                "name": dataset.name,
                "source_type": dataset.source_type,
                "original_filename": dataset.original_filename,
                "file_extension": dataset.file_extension,
                "rows": dataset.rows,
                "columns": dataset.columns,
                "status": dataset.status
            },
            "profile": profile
        }), 201

    except Exception as e:

        db.session.rollback()

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500